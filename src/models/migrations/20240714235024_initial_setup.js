/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  // Create fact_plants table first
  await knex.schema.createTable('fact_plants', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('mother_id').unsigned().nullable();
    table.integer('father_id').unsigned().nullable();
    table.string('gender').notNullable().defaultTo('f');
    table.integer('strain_id').unsigned().notNullable();
    table.boolean('is_clone_generator').notNullable().defaultTo(false);
    table.date('growth_start_date').nullable();
    table.tinyint('start_stage').unsigned().notNullable()
      .comment('0: seed, 1: germination, 2: seedling, 3: vegetative, 4: preflowering, 5: flowering, 6: harvested');
    table.date('germination_date').nullable();
    table.date('seedling_date').nullable();
    table.date('vegetative_date').nullable();
    table.date('preflowering_date').nullable();
    table.date('flowering_date').nullable();
    table.date('harvesting_date').nullable();

    table.index(['mother_id']);
    table.index(['father_id']);
    table.index(['strain_id']);
    table.index(['gender']);
  });

  await knex.schema.createTable('dim_terpenes', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description').nullable();
  });

  await knex.schema.createTable('dim_strains', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.decimal('thc', 5, 2).notNullable();
    table.decimal('cbd', 5, 2).notNullable();
    table.tinyint('type').unsigned().notNullable().comment('1: sativa, 2: hybrid, 3: indica');
    table.string('flavor_profile').notNullable();
    table.string('terpenes').notNullable();
    table.tinyint('germinating_time').unsigned().notNullable();
    table.tinyint('seedling_time').unsigned().notNullable();
    table.tinyint('vegetative_time').unsigned().notNullable();
    table.tinyint('preflowering_time').unsigned().notNullable();
    table.tinyint('flowering_time').unsigned().notNullable();
    table.tinyint('time_until_harvesting').unsigned().notNullable();
    table.integer('father_plant_id').unsigned().nullable();
    table.integer('mother_plant_id').unsigned().nullable();
    table.integer('father_strain_id').unsigned().nullable();
    table.integer('mother_strain_id').unsigned().nullable();
    table.tinyint('cultivation_difficulty').unsigned().notNullable();
    table.smallint('height').unsigned().notNullable(); // Height in cm
    table.string('origin').notNullable();
    table.text('description').notNullable();

    table.index(['thc']);
    table.index(['cbd']);
    table.index(['type']);
    table.index(['cultivation_difficulty']);
  });

  await knex.schema.createTable('dim_change_categories', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
  });

  await knex.schema.createTable('fact_changes', function(table) {
    table.increments('id').primary();
    table.timestamp('timestamp').defaultTo(knex.fn.now()).notNullable();
    table.date('day').notNullable();
    table.integer('plant_id').unsigned().notNullable();
    table.integer('change_category_id').unsigned().notNullable();
    table.decimal('quantity', 10, 4).nullable();
    table.text('comment').nullable();

    table.index(['plant_id']);
    table.index(['change_category_id']);
  });

  await knex.schema.createTable('fact_logs', function(table) {
    table.increments('id').primary();
    table.timestamp('timestamp').defaultTo(knex.fn.now()).notNullable();
    table.date('day').notNullable();
    table.integer('plant_id').unsigned().notNullable();
    table.decimal('temperature', 3, 1).nullable();
    table.decimal('humidity', 3, 1).nullable();
    table.decimal('ph', 4, 2).nullable();
    table.tinyint('stage_id').unsigned().notNullable()
      .comment('1: germination, 2: seedling, 3: vegetative, 4: preflowering, 5: flowering, 6: harvested');
    table.tinyint('light_hours').unsigned().notNullable();
    table.tinyint('dark_hours').unsigned().notNullable();
    table.boolean('has_picture').notNullable();
    table.text('comment').nullable();

    table.index(['plant_id']);
  });

  await knex.schema.table('fact_plants', function(table) {
    table.foreign('strain_id').references('id').inTable('dim_strains');
    table.foreign('mother_id').references('id').inTable('fact_plants');
    table.foreign('father_id').references('id').inTable('fact_plants');
  });

  await knex.schema.table('dim_strains', function(table) {
    table.foreign('father_strain_id').references('id').inTable('dim_strains');
    table.foreign('mother_strain_id').references('id').inTable('dim_strains');
    table.foreign('father_plant_id').references('id').inTable('fact_plants');
    table.foreign('mother_plant_id').references('id').inTable('fact_plants');
  });

  await knex.schema.table('fact_changes', function(table) {
    table.foreign('plant_id').references('id').inTable('fact_plants');
    table.foreign('change_category_id').references('id').inTable('dim_change_categories');
  });

  await knex.schema.table('fact_logs', function(table) {
    table.foreign('plant_id').references('id').inTable('fact_plants');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.table('fact_changes', function(table) {
    table.dropForeign('plant_id');
    table.dropForeign('change_category_id');
  });

  await knex.schema.table('fact_logs', function(table) {
    table.dropForeign('plant_id');
  });

  await knex.schema.table('fact_plants', function(table) {
    table.dropForeign('strain_id');
    table.dropForeign('mother_id');
    table.dropForeign('father_id');
  });

  await knex.schema.table('dim_strains', function(table) {
    table.dropForeign('father_strain_id');
    table.dropForeign('mother_strain_id');
    table.dropForeign('father_plant_id');
    table.dropForeign('mother_plant_id');
  });

  await knex.schema.dropTable('fact_logs');
  await knex.schema.dropTable('fact_changes');
  await knex.schema.dropTable('dim_change_categories');
  await knex.schema.dropTable('fact_plants');
  await knex.schema.dropTable('dim_strains');
  await knex.schema.dropTable('dim_terpenes');
}
