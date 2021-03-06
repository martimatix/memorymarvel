# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150328094707) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comics", force: :cascade do |t|
    t.integer  "marvel_id"
    t.string   "title"
    t.string   "image_url"
    t.integer  "deck_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comics_decks", id: false, force: :cascade do |t|
    t.integer "comic_id"
    t.integer "deck_id"
  end

  create_table "decks", force: :cascade do |t|
    t.string   "title"
    t.integer  "num_comics", default: 0
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "favourites", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "deck_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
