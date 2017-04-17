FactoryGirl.define do
  factory :user do
    name     '机器之心'
    city     '440_300'
    company  'jixiezhixin'
    title    'developer'

    trait :without_validation do
      to_create { |instance| instance.save(validate: false) }
    end

    trait :with_email do
      sequence(:email) { |n| "user#{n}@gmail.com" }
    end

    trait :with_mobile do
      sequence(:mobile) { rand(10**10...10**11) }
    end

    trait :with_password do
      password 'password'
    end

    trait :with_wechat_authorization do
      after(:create) { |user| create(:wechat_authorization, user: user) }
    end

    trait :with_weibo_authorization do
      after(:create) { |user| create(:weibo_authorization, user: user) }
    end

    factory :basic_user do
      with_email
      with_password

      factory :admin do
        roles ['admin']
      end

      factory :organizer do
        roles ['organizer']
      end

      factory :editor do
        roles ['editor']
      end
    end
  end
end
