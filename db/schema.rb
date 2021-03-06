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

ActiveRecord::Schema.define(version: 20170419033949) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "articles", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "title",                         null: false
    t.string   "description"
    t.text     "content"
    t.string   "cover_image"
    t.integer  "status",            default: 0
    t.integer  "copyright",         default: 0
    t.string   "copyright_content"
    t.string   "check_content"
    t.datetime "publish_at"
    t.uuid     "author_id"
    t.uuid     "category_id"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.index ["status"], name: "index_articles_on_status", using: :btree
    t.index ["title"], name: "index_articles_on_title", using: :btree
  end

  create_table "articles_cooperation_authors", force: :cascade do |t|
    t.uuid     "article_id"
    t.uuid     "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["article_id"], name: "index_articles_cooperation_authors_on_article_id", using: :btree
    t.index ["user_id"], name: "index_articles_cooperation_authors_on_user_id", using: :btree
  end

  create_table "authorizations", force: :cascade do |t|
    t.uuid     "user_id"
    t.string   "provider"
    t.string   "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["provider", "uid"], name: "index_authorizations_on_provider_and_uid", using: :btree
    t.index ["user_id"], name: "index_authorizations_on_user_id", using: :btree
  end

  create_table "categories", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "title"
    t.string   "type"
    t.uuid     "category_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "events", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name",                    null: false
    t.text     "description"
    t.integer  "event_type",  default: 1, null: false
    t.integer  "status",      default: 0
    t.date     "start_date"
    t.date     "end_date"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "short_name"
    t.index ["name"], name: "index_events_on_name", using: :btree
    t.index ["status"], name: "index_events_on_status", using: :btree
  end

  create_table "events_guests", force: :cascade do |t|
    t.uuid     "event_id"
    t.uuid     "guest_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "rank_order"
    t.boolean  "show",       default: false
    t.uuid     "avatar_id"
    t.index ["event_id"], name: "index_events_guests_on_event_id", using: :btree
    t.index ["guest_id"], name: "index_events_guests_on_guest_id", using: :btree
  end

  create_table "guests", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "company"
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "images", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "file"
    t.uuid     "imageable_id"
    t.string   "imageable_type"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.boolean  "default",        default: false
    t.index ["imageable_id", "imageable_type"], name: "index_images_on_imageable_id_and_imageable_type", using: :btree
  end

  create_table "partner_categories", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name",       null: false
    t.uuid     "event_id"
    t.integer  "rank_order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_partner_categories_on_event_id", using: :btree
  end

  create_table "partner_categories_partners", force: :cascade do |t|
    t.uuid     "partner_category_id"
    t.uuid     "partner_id"
    t.integer  "rank_order"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.uuid     "logo_id"
    t.index ["partner_category_id"], name: "index_partner_categories_partners_on_partner_category_id", using: :btree
    t.index ["partner_id"], name: "index_partner_categories_partners_on_partner_id", using: :btree
  end

  create_table "partners", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "remember_tokens", force: :cascade do |t|
    t.uuid     "user_id"
    t.string   "token",           null: false
    t.string   "ua"
    t.string   "ip"
    t.datetime "last_actived_at"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["created_at"], name: "index_remember_tokens_on_created_at", using: :btree
    t.index ["user_id", "token"], name: "index_remember_tokens_on_user_id_and_token", using: :btree
  end

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id"
    t.string   "taggable_type"
    t.integer  "taggable_id"
    t.string   "tagger_type"
    t.integer  "tagger_id"
    t.string   "context",       limit: 128
    t.datetime "created_at"
    t.index ["context"], name: "index_taggings_on_context", using: :btree
    t.index ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true, using: :btree
    t.index ["tag_id"], name: "index_taggings_on_tag_id", using: :btree
    t.index ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context", using: :btree
    t.index ["taggable_id", "taggable_type", "tagger_id", "context"], name: "taggings_idy", using: :btree
    t.index ["taggable_id"], name: "index_taggings_on_taggable_id", using: :btree
    t.index ["taggable_type"], name: "index_taggings_on_taggable_type", using: :btree
    t.index ["tagger_id", "tagger_type"], name: "index_taggings_on_tagger_id_and_tagger_type", using: :btree
    t.index ["tagger_id"], name: "index_taggings_on_tagger_id", using: :btree
  end

  create_table "tags", force: :cascade do |t|
    t.string  "name"
    t.integer "taggings_count", default: 0
    t.index ["name"], name: "index_tags_on_name", unique: true, using: :btree
  end

  create_table "users", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "email"
    t.string   "password_digest",               default: "", null: false
    t.string   "username"
    t.string   "mobile"
    t.string   "roles",                         default: [],              array: true
    t.string   "company"
    t.string   "title"
    t.string   "avatar"
    t.string   "bio"
    t.string   "name"
    t.string   "pinyin"
    t.string   "pinyin_abbr"
    t.integer  "city"
    t.string   "email_verify_token"
    t.datetime "email_verify_token_created_at"
    t.datetime "email_verified_at"
    t.index ["email"], name: "index_users_on_email", using: :btree
    t.index ["email_verify_token"], name: "index_users_on_email_verify_token", unique: true, using: :btree
    t.index ["mobile"], name: "index_users_on_mobile", using: :btree
    t.index ["pinyin"], name: "index_users_on_pinyin", using: :btree
    t.index ["pinyin_abbr"], name: "index_users_on_pinyin_abbr", using: :btree
    t.index ["username"], name: "index_users_on_username", using: :btree
  end

  create_table "vote_items", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name",                   null: false
    t.uuid     "vote_id",                null: false
    t.integer  "count",      default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.index ["vote_id"], name: "index_vote_items_on_vote_id", using: :btree
  end

  create_table "votes", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name",                         null: false
    t.boolean  "enabled",      default: false, null: false
    t.string   "votable_type",                 null: false
    t.uuid     "votable_id",                   null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.index ["votable_type", "votable_id"], name: "index_votes_on_votable_type_and_votable_id", using: :btree
  end

end
