# COPYRIGHT: 2010 Nick Treadway (rnt@yeti-media.com)
# LICENSE: MIT

module JqueryToolsHelper
  # format options 'default', 'full' or 'jquery'
  def jquery_tools(format)
      case format
      when "default"
        # The recommended practice is to load jquery from Google's CDN service.
        "<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js'></script>" +
        "<script src='http://cdn.jquerytools.org/1.1.2/tiny/jquery.tools.min.js'></script>"
      when "full"
        # FULL jQuery Tools from CDN this includes jquery
        "<script src='http://cdn.jquerytools.org/1.1.2/full/jquery.tools.min.js'></script>"
      when "jquery"
        # load just jquery
        "<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js'></script>"
      end
  end
  
end