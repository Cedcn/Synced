FactoryGirl.define do
  factory :article do
    sequence(:title) { |n| "title_#{n}" }
    description 'it just a article'
  end
end
