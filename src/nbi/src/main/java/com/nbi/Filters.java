package com.nbi;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;
import java.util.logging.Logger;

@Component
public class Filters implements Filter {

    private static final Logger logger = Logger.getLogger(Filters.class.getName());

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization code if required
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        // Generate UUID for each request
        String requestId = UUID.randomUUID().toString();
        
        // Log request before processing
        logRequest((HttpServletRequest) request, requestId);
        
        // Wrap request and response to capture the response body
        ContentCachingRequestWrapper wrappedRequest = new ContentCachingRequestWrapper((HttpServletRequest) request);
        ContentCachingResponseWrapper wrappedResponse = new ContentCachingResponseWrapper((HttpServletResponse) response);
        
        // Proceed with the request and response chain
        chain.doFilter(wrappedRequest, wrappedResponse);
        
        // Log response after processing
        logResponse(wrappedResponse, requestId);
        
        // Ensure the response body is written to the client
        wrappedResponse.copyBodyToResponse();
    }

    @Override
    public void destroy() {
        // Cleanup code if required
    }

    private void logRequest(HttpServletRequest request, String requestId) {
        // Log the incoming request with the UUID
        logger.info("Request ID: " + requestId + " | Method: " + request.getMethod() + " | URI: " + request.getRequestURI());
    }

    private void logResponse(ContentCachingResponseWrapper response, String requestId) throws IOException {
        // Log the outgoing response with the UUID
        logger.info("Response for Request ID: " + requestId + " | Status: " + response.getStatus());
    }
}
