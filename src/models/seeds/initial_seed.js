/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  let dummyTerpeneId = await knex('dim_terpenes')
    .select('id')
    .where({ name: 'Dummy Terpene' })
    .first();

  if (!dummyTerpeneId) {
    dummyTerpeneId = await knex('dim_terpenes').insert({
      name: 'Dummy Terpene',
      description: 'A rare and unique terpene with a subtle aroma of fresh broccoli'
        + ' and hints of buttery popcorn. Known for its calming effects and mild'
        + ' euphoric properties, this terpene is often sought after for its'
        + ' ability to evoke a sense of comfort and relaxation.'
    });
    dummyTerpeneId = dummyTerpeneId[0];
  } else {
    dummyTerpeneId = dummyTerpeneId.id;
  }

  let dummyStrainId = await knex('dim_strains')
    .select('id')
    .where({ name: 'Dummy Strain' })
    .first();
  if (!dummyStrainId) {
    dummyStrainId = await knex('dim_strains').insert({
      name: 'Dummy Strain',
      thc: 15.3,
      cbd: 7.7,
      type: 2,
      flavor_profile: 'None',
      terpenes: dummyTerpeneId.toString(),
      germinating_time: 2,
      seedling_time: 2,
      vegetative_time: 21,
      preflowering_time: 7,
      flowering_time: 10,
      time_until_harvesting: 42,
      father_plant_id: null,
      mother_plant_id: null,
      father_strain_id: null,
      mother_strain_id: null,
      cultivation_difficulty: 3,
      height: 115,
      origin: 'bits',
      description: 'The Dummy Strain is a really exotic kind of strain.'
        + ' After you inhale its first puff, you will feel like this isn\'t even real.'
    });
    dummyStrainId = dummyStrainId[0];
  } else {
    dummyStrainId = dummyStrainId.id;
  }

  let dummyPlantId = await knex('fact_plants')
    .select('id')
    .where({ name: 'Dummy Plant' })
    .first();
  if (!dummyPlantId) {
    dummyPlantId = await knex('fact_plants').insert({
      name: 'Dummy Plant',
      mother_id: null,
      father_id: null,
      gender: 'f',
      strain_id: dummyStrainId,
      is_clone_generator: false,
      growth_start_date: null,
      start_stage: 0,
      germination_date: null,
      seedling_date: null,
      vegetative_date: null,
      preflowering_date: null,
      flowering_date: null,
      harvesting_date: null
    });
    dummyPlantId = dummyPlantId[0];
  } else {
    dummyPlantId = dummyPlantId.id;
  }

  let dummyChangeCategoryId = await knex('dim_change_categories')
    .select('id')
    .where({ name: 'Melted Chocolate' })
    .first();
  if (!dummyChangeCategoryId) {
    dummyChangeCategoryId = await knex('dim_change_categories').insert({
      name: 'Melted Chocolate'
    });
    dummyChangeCategoryId = dummyChangeCategoryId[0];
  } else {
    dummyChangeCategoryId = dummyChangeCategoryId.id;
  }

  let dummyChangeId = await knex('fact_changes')
    .select('id')
    .where({ comment: 'Added 20 oz of melted dark chocolate' })
    .first();
  if (!dummyChangeId) {
    dummyChangeId = await knex('fact_changes').insert({
      timestamp: knex.fn.now(),
      day: knex.fn.now(),
      plant_id: dummyPlantId,
      change_category_id: dummyChangeCategoryId,
      quantity: 20,
      comment: 'Added 20 oz of melted dark chocolate'
    });
    dummyChangeId = dummyChangeId[0];
  } else {
    dummyChangeId = dummyChangeId.id;
  }

  const logComment = 'Dummy log for initial setup. Adding some random strings to ensure'
      + ' uniquenessf0qynr737820mhfa';
  let dummyLogId = await knex('fact_logs')
    .select('id')
    .where({ comment: logComment })
    .first();
  if (!dummyLogId) {
    dummyLogId = await knex('fact_logs').insert({
      timestamp: knex.fn.now(),
      day: knex.fn.now(),
      plant_id: dummyPlantId,
      temperature: 25,
      humidity: 43.2,
      ph: 6.5,
      stage_id: 1,
      light_hours: 0,
      dark_hours: 0,
      has_picture: false,
      comment: logComment
    });
    dummyLogId = dummyLogId[0];
  } else {
    dummyLogId = dummyLogId.id;
  }
}
