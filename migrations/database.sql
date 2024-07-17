DO $$
DECLARE
	book1 uuid := gen_random_uuid();
	book2 uuid := gen_random_uuid();
	book3 uuid := gen_random_uuid();
BEGIN

	drop table if exists books cascade;
	create table books (
		id uuid primary key,
		title character varying not null,
		description text,
		img character varying ,
		author character varying not null,
		price numeric(5,2) not null,
		language character varying not null,
		publisher character varying not null,
		pages integer not null,
		publication_date date not null,
		created_at timestamp not null,
		updated_at timestamp not null
	);

	insert into books values
	(book1, 'The Way of Kings', null, null, 'Brandon Sanderson',
		9.99, 'english', 'Tor Books', 1280, '2011-05-24', now(), now()),
	(book2, 'Words of Radiance', null, null, 'Brandon Sanderson',
		7.99, 'english', 'Tor Books', 1088, '2014-03-04', now(), now()),
	(book3, 'Oathbringer', null, null, 'Brandon Sanderson',
		8.99, 'english', 'Tor Books', 1248, '2017-11-24', now(), now());

	drop table if exists reviews;
	create table reviews(
		id uuid primary key,
		username character varying not null,
		comment text not null,
		rating numeric(2, 1) not null,
		book_id uuid not null references books(id) on delete cascade,
		created_at timestamp not null,
		updated_at timestamp not null
	);

	insert into reviews values
	(gen_random_uuid(), 'calebgl', 'hello world!', 4.8, book1, now(), now());

	drop table if exists review_summaries;
	create table review_summaries (
		book_id uuid primary key references books(id) on delete cascade,
		review_count bigint not null,
		average_rating numeric(2,1) not null
	);

	insert into review_summaries values
	(book1, 1, 4.8);
END;
$$;
