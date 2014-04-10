OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, '1kGu0lZIsid84fFA6RwUzA', 'dapabZg4VXYSGlVDOWVuYFuqK82BMV511w7XPBmMLo'
  provider :facebook, '621737011247997', '072157a2fcb5f2d483106b91f11383ff', secure_image_url: true, image_size: 'small'
  provider :google, '378634781577.apps.googleusercontent.com', 'HHWbd2E_5VkxxDdVy9JpTnOE'
  provider :github, '98d34dfa486462e28ae3', 'bc3df4087ae61b150a077d1974b746a1676d5aba', scope: 'user'
end

