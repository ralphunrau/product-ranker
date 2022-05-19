
exports.seed = async function(knex) {
  // delete existing entries
  return knex('products').del()
    .then(() => {
      // insert new seeds
      return knex('products').insert([
        {
          id: 'B00029KC2K',
          image: "https://m.media-amazon.com/images/I/7146KGOfMIL._AC_UL320_.jpg",
          link: "https://www.amazon.com/Thermo-Tec-13575-Adhesive-Aluminized-Barrier/dp/B00029KC2K/ref=sr_1_18?qid=1652848521&s=automotive&sr=1-18",
          title: 'Thermo-Tec 13575 Adhesive Backed Aluminized Heat Barrier, 12" x 24"',
          price: "$21.99",
          rating: 4.5,
          ratings_total: 2093
        },
        {
          id: "B000C8ZB18",
          image: "https://m.media-amazon.com/images/I/61wQ+-0KQpL._AC_UL320_.jpg",
          link: "https://www.amazon.com/Exhaust-Mate-35794-Heavy-U-Bolt-Exhaust/dp/B000C8ZB18/ref=sr_1_29?qid=1652848521&s=automotive&sr=1-29",
          title: 'Exhaust-Mate 35794 3" Heavy Duty U-Bolt Exhaust Clamp',
          price: "$5.29",
          rating: 4.6,
          ratings_total: 1601
        },
        {
          id: "B00199F2WW",
          image: "https://m.media-amazon.com/images/I/61LTx6SrQVL._AC_UL320_.jpg",
          link: "https://www.amazon.com/PerTronix-40011-Flame-Thrower-Volt-Coil/dp/B00199F2WW/ref=sr_1_27?qid=1652848521&s=automotive&sr=1-27",
          title: "PerTronix 40011 Flame-Thrower 40,000 Volt 1.5 ohm Coil , Black",
          price: "$29.25",
          rating: 4.7,
          ratings_total: 1357
        }
      ]);
    });
};
