OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  # provider :developer unless Rails.env.production?
  # provider :twitter, '1kGu0lZIsid84fFA6RwUzA', 'dapabZg4VXYSGlVDOWVuYFuqK82BMV511w7XPBmMLo',
  provider :facebook, '621737011247997', '072157a2fcb5f2d483106b91f11383ff'
end

