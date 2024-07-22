import { v4 } from 'uuid';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	const books = [
		{
			id: v4(),
			title: 'The Way of Kings',
			description: `From #1 New York Times bestselling author Brandon Sanderson, The Way of Kings, Book One of the Stormlight Archive, begins an incredible new saga of epic proportion.

Roshar is a world of stone and storms. Uncanny tempests of incredible power sweep across the rocky terrain so frequently that they have shaped ecology and civilization alike. Animals hide in shells, trees pull in branches, and grass retracts into the soilless ground. Cities are built only where the topography offers shelter.

It has been centuries since the fall of the ten consecrated orders known as the Knights Radiant, but their Shardblades and Shardplate remain: mystical swords and suits of armor that transform ordinary men into near-invincible warriors. Men trade kingdoms for Shardblades. Wars were fought for them, and won by them.

One such war rages on a ruined landscape called the Shattered Plains. There, Kaladin, who traded his medical apprenticeship for a spear to protect his little brother, has been reduced to slavery. In a war that makes no sense, where ten armies fight separately against a single foe, he struggles to save his men and to fathom the leaders who consider them expendable.

Brightlord Dalinar Kholin commands one of those other armies. Like his brother, the late king, he is fascinated by an ancient text called The Way of Kings. Troubled by over-powering visions of ancient times and the Knights Radiant, he has begun to doubt his own sanity.

Across the ocean, an untried young woman named Shallan seeks to train under an eminent scholar and notorious heretic, Dalinar's niece, Jasnah. Though she genuinely loves learning, Shallan's motives are less than pure. As she plans a daring theft, her research for Jasnah hints at secrets of the Knights Radiant and the true cause of the war.

The result of over ten years of planning, writing, and world-building, The Way of Kings is but the opening movement of the Stormlight Archive, a bold masterpiece in the making.

Speak again the ancient oaths:

Life before death.
Strength before weakness.
Journey before Destination.

and return to men the Shards they once bore.

The Knights Radiant must stand again.

Other Tor books by Brandon Sanderson

The Cosmere
The Stormlight Archive
● The Way of Kings
● Words of Radiance
● Edgedancer (novella)
● Oathbringer
● Dawnshard (novella)
● Rhythm of War

The Mistborn Saga
The Original Trilogy
● Mistborn
● The Well of Ascension
● The Hero of Ages

Wax and Wayne
● The Alloy of Law
● Shadows of Self
● The Bands of Mourning
● The Lost Metal

Other Cosmere novels
● Elantris
● Warbreaker
● Tress of the Emerald Sea
● Yumi and the Nightmare Painter
● The Sunlit Man

Collection
● Arcanum Unbounded: The Cosmere Collection

The Alcatraz vs. the Evil Librarians series
● Alcatraz vs. the Evil Librarians
● The Scrivener's Bones
● The Knights of Crystallia
● The Shattered Lens
● The Dark Talent
● Bastille vs. the Evil Librarians (with Janci Patterson)

Other novels
● The Rithmatist
● Legion: The Many Lives of Stephen Leeds
● The Frugal Wizard's Handbook for Surviving Medieval England

Other books by Brandon Sanderson

The Reckoners
● Steelheart
● Firefight
● Calamity

Skyward
● Skyward
● Starsight
● Cytonic
● Skyward Flight (with Janci Patterson)
● Defiant`,
			img: null,
			author: 'Brandon Sanderson',
			price: 9.99,
			language: 'english',
			publisher: 'Tor Books',
			pages: '1280',
			publication_date: '2011-05-24',
			created_at: new Date(),
			updated_at: new Date()
		},
		{
			id: v4(),
			title: 'Words of Radiance',
			description: null,
			img: null,
			author: 'Brandon Sanderson',
			price: 7.99,
			language: 'english',
			publisher: 'Tor Books',
			pages: '1088',
			publication_date: '2014-03-04',
			created_at: new Date(),
			updated_at: new Date()
		},
		{
			id: v4(),
			title: 'Oathbringer',
			description: null,
			img: null,
			author: 'Brandon Sanderson',
			price: 8.99,
			language: 'english',
			publisher: 'Tor Books',
			pages: '1248',
			publication_date: '2017-11-24',
			created_at: new Date(),
			updated_at: new Date()
		}
	];

	await knex('books').del();
	await knex('books').insert(books);

	const reviews = [
		{
			id: v4(),
			username: 'admin',
			comment: 'Great book!',
			rating: 50,
			book_id: books[0].id,
			created_at: new Date(),
			updated_at: new Date()
		},
		{
			id: v4(),
			username: 'admin',
			comment: 'I would buy it again!',
			rating: 49,
			book_id: books[0].id,
			created_at: new Date(),
			updated_at: new Date()
		},
		{
			id: v4(),
			username: 'admin',
			comment: 'My collection keeps growings!',
			rating: 48,
			book_id: books[0].id,
			created_at: new Date(),
			updated_at: new Date()
		}
	];

	await knex('reviews').del();
	await knex('reviews').insert(reviews);

	const reviewSummaries = Object.values(
		reviews.reduce((acc, cur) => {
			if (!acc[cur.book_id]) {
				acc[cur.book_id] = {
					book_id: cur.book_id,
					total_review_count: 0,
					one_star_count: 0,
					two_star_count: 0,
					three_star_count: 0,
					four_star_count: 0,
					five_star_count: 0,
					average_rating: 0,
					created_at: new Date(),
					updated_at: new Date()
				};
			}

			let summary = acc[cur.book_id];

			if (cur.rating < 20) {
				summary.one_star_count += 1;
			} else if (cur.rating < 30) {
				summary.two_star_count += 1;
			} else if (cur.rating < 40) {
				summary.three_star_count += 1;
			} else if (cur.rating < 50) {
				summary.four_star_count += 1;
			} else {
				summary.five_star_count += 1;
			}

			summary.total_review_count += 1;
			summary.average_rating += cur.rating;

			acc[cur.book_id] = summary;

			return acc;
		}, {})
	);

	const reviewSummariesEmpty = books.map((book) => ({
		book_id: book.id,
		total_review_count: 0,
		one_star_count: 0,
		two_star_count: 0,
		three_star_count: 0,
		four_star_count: 0,
		five_star_count: 0,
		average_rating: 0,
		created_at: new Date(),
		updated_at: new Date()
	}));

	await knex('review_summaries');
	await knex('review_summaries').insert(reviewSummariesEmpty);

	for (let i = 0; i < reviewSummaries.length; i++) {
		reviewSummaries[i].average_rating /= reviewSummaries[i].total_review_count * 10;
	}

	for (const summary of reviewSummaries) {
		await knex('review_summaries').update(summary).where('book_id', summary.book_id);
	}
}
