json.array!(@users) do |user|
  json.extract! user, :id, :name, :is_admin, :password_digest
  json.url user_url(user, format: :json)
end
