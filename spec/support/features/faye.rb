begin
  Timeout.timeout(1) do
    uri = URI.parse('http://localhost:9292')
    TCPSocket.new(uri.host, uri.port).close
  end
rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, Timeout::ERROR
  raise 'Could not connect to faye'
end
