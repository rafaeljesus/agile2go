module ApplicationHelper

  def display_base_errors resource
    return '' if (resource.errors.empty?)
    messages = resource.errors.full_messages.map { |msg| content_tag(:li, msg) }.join
    html = <<-HTML
      <div id="error_explanation" class="ui message red">
        <i class="close icon"></i>
        <div class="header">#{pluralize(resource.errors.count, "error")} prohibited this task from being saved:</div>
        <ul>#{messages}</ul>
      </div>
    HTML
    html.html_safe
  end

  def label_asterisk
    content_tag :div, class: 'ui corner label' do
      content_tag :i, '', class: 'icon asterisk'
    end
  end
end
