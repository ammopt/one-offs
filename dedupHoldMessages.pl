#!/usr/bin/perl

use DBI;           # Connect to DB
use DBD::mysql;    # Manipulate MySQL
# use Data::Dumper;

# Koha Imports
use C4::Context;    # Koha Database Access

my $DEBUG = 0;
my $UPDATE = 1;

my %holdsHash;
my @deleteArray;

my $holds = &getPendingHolds();

print "There are " . scalar(@$holds) . " records\n" if $DEBUG;

my $deleteCount = 0;
my $deleteString;

if (scalar(@$holds) > 0) {
	
	foreach my $hold (@$holds) {
		if (exists $holdsHash{@$hold[1] . @$hold[2]}) {
			push(@deleteArray,@$hold[0]);		
		} else {
			$holdsHash{@$hold[1] . @$hold[2]} = @$hold[1] . @$hold[2];
		}
	}		

	foreach my $id (@deleteArray) {
		print "DELETE: $id\n" if $DEBUG;
		$deleteString .= $id . "\n";
		&deleteMessage($id);
		$deleteCount++;
	}

	foreach my $key (keys %holdsHash) {
		print "UNIQUE: $key\n" if $DEBUG;
	}

	print $deleteCount . " records deleted\n" . $deleteString;
	
} else {
	# do nothing
}

my $messageIDs = &getArticleRequests();

foreach my $id (@$messageIDs) {
	print @$id[0] . "\n";		
	&deleteMessage(@$id[0]);
}

exit;

############################################

sub getPendingHolds() {

	my $dbh = C4::Context->dbh;
        my $sth;

	my $SQL = "select 
  			message_id,borrowernumber,time_queued 
		from 
  			message_queue 
		where 
  			status = 'pending'
		and 
  			letter_code = 'HOLD'
		and 
  			time_queued >= DATE_SUB(NOW(),INTERVAL 1 HOUR);";

	if ($DEBUG) {
		print "###########################\n\n";
		print $SQL . "\n\n";
		print "###########################\n\n";
	}

        $sth = $dbh->prepare($SQL)
                or warn "Can't prepare query: $dbh->errstr\n";

        $sth->execute()
          or warn "Can't execute the query: $sth->errstr\n";

        my $data = $sth->fetchall_arrayref();
        return $data;

}

############################################

sub deleteMessage($) {

	my $id = $_[0];

	my $dbh = C4::Context->dbh;
        my $sth;

	my $SQL = "update
			message_queue
		set
		 	status = 'deleted'
		where 
			message_id = '$id';";
	
	if ($DEBUG) {
		print "###########################\n\n";
		print $SQL . "\n\n";
		print "###########################\n\n";
	}

	if ($UPDATE) {

		$sth = $dbh->prepare($SQL)
                	or warn "Can't prepare query: $dbh->errstr\n";
		$sth->execute()
          		or warn "Can't execute the query: $sth->errstr\n";

		print "Message $id deleted\n" if $DEBUG;

		$sth->finish();
	}

	$dbh->disconnect();	
}

############################################

sub getArticleRequests() {

	my $dbh = C4::Context->dbh;
        my $sth;

	my $SQL = "select 
  			message_id 
		from 
  			message_queue 
		where 
  			status = 'pending'
		and 
  			letter_code in  ('AR_PENDING','AR_COMPLETED','AR_PROCESSING');";

	if ($DEBUG) {
		print "###########################\n\n";
		print $SQL . "\n\n";
		print "###########################\n\n";
	}

        $sth = $dbh->prepare($SQL)
                or warn "Can't prepare query: $dbh->errstr\n";

        $sth->execute()
          or warn "Can't execute the query: $sth->errstr\n";

        my $data = $sth->fetchall_arrayref();
        return $data;

}

###########################################
