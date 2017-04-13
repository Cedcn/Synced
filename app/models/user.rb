class User < ApplicationRecord
  include Pinyinable

  has_secure_password validation: false

  has_many :authorizations

  validates :name, length: { in: 2..20 }, allow_nil: true,
    format: { with: /\A(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+\z/ }

  validates :email,  uniqueness: { case_sensitive: false },
    format: { with: /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/ },
    allow_nil: true
  validates :mobile, uniqueness: true,
    format: { with: /\A\d{11}\z/, message: :only_chinese_mobile },
    allow_nil: true
  validates :username, length: { in: 2..20 },
    format: { with: /\A(?!_)(?!.*?_$)[a-zA-Z0-9_]+\z/ },
    uniqueness: { case_sensitive: false }, on: :update
  validates :password, length: { in: 6...32 }, allow_nil: true

  validate :email_or_mobile, on: :create
  validate :check_phone_verify_code, if: proc { |u| u.mobile.present? && u.mobile_changed? }

  before_create :generate_username

  attr_accessor :phone_verify_code

  class << self
    def search_by_login_name(identify)
      q = identify.to_s.downcase.chomp
      return unless q
      find_by('lower(email) = ? or mobile = ? or lower(username) = ?', q, q, q)
    end

    def create_with_omniauth(auth)
      ActiveRecord::Base.transaction do
        user = User.new(name: auth['info']['nickname'])
        user.save(validate: false)
        user.authorizations.create!(provider: auth['provider'], uid: auth['uid'])
        user
      end
    rescue ActiveRecord::RecordInvalid
      nil
    end
  end

  def authenticate(password)
    super(password)
  rescue BCrypt::Errors::InvalidHash
    nil
  end

  def nickname
    name || email_name || mobile
  end

  def email_name
    email&.split('@')&.first
  end

  private

  def generate_username
    pinyin_name = PinYin.of_string(nickname).join.downcase
    self[:username] = pinyin_name.length > 11 ? PinYin.abbr(nickname).slice(0, 11) : pinyin_name
    self[:username] = username + '_' + SecureRandom.hex(3) while User.exists? username: username
  end

  def email_or_mobile
    errors.add(:base, :need_mobile_or_email) if email.blank? && mobile.blank?
    errors.add(:base, :only_mobile_or_email) if email.present? && mobile.present?
  end

  def check_phone_verify_code
    return if phone_verify_code.present? && phone_verify_code == Rails.cache.fetch("phone_verify_code:#{mobile}")
    errors.add(:mobile, :wrong_verify_code)
  end
end

# == Schema Information
#
# Table name: users
#
#  id              :uuid             not null, primary key
#  email           :string
#  password_digest :string           default(""), not null
#  username        :string
#  mobile          :string
#  roles           :string           default([]), is an Array
#  city            :string
#  company         :string
#  title           :string
#  avatar          :string
#  bio             :string
#  name            :string
#  pinyin          :string
#  pinyin_abbr     :string
#
# Indexes
#
#  index_users_on_email        (email)
#  index_users_on_mobile       (mobile)
#  index_users_on_pinyin       (pinyin)
#  index_users_on_pinyin_abbr  (pinyin_abbr)
#  index_users_on_username     (username)
#
