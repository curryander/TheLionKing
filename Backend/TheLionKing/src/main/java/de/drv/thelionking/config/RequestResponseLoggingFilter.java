package de.drv.thelionking.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
public class RequestResponseLoggingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RequestResponseLoggingFilter.class);
    private static final int MAX_PAYLOAD_LENGTH = 4000;
    private static final List<MediaType> VISIBLE_TYPES = List.of(
            MediaType.valueOf("text/*"),
            MediaType.APPLICATION_JSON,
            MediaType.APPLICATION_XML,
            MediaType.APPLICATION_FORM_URLENCODED,
            MediaType.valueOf("application/*+json"),
            MediaType.valueOf("application/*+xml")
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        ContentCachingRequestWrapper requestWrapper = wrapRequest(request);
        ContentCachingResponseWrapper responseWrapper = wrapResponse(response);
        long startNanos = System.nanoTime();

        try {
            filterChain.doFilter(requestWrapper, responseWrapper);
        } finally {
            long durationMs = (System.nanoTime() - startNanos) / 1_000_000;
            logRequest(requestWrapper);
            logResponse(requestWrapper, responseWrapper, durationMs);
            responseWrapper.copyBodyToResponse();
        }
    }

    private void logRequest(ContentCachingRequestWrapper request) {
        String path = request.getRequestURI() + (request.getQueryString() == null ? "" : "?" + request.getQueryString());
        String body = getPayload(path, request.getContentType(), request.getContentAsByteArray(), request.getCharacterEncoding());
        log.info("HTTP REQUEST {} {} | body={}", request.getMethod(), path, body);
    }

    private void logResponse(ContentCachingRequestWrapper request, ContentCachingResponseWrapper response, long durationMs) {
        String path = request.getRequestURI() + (request.getQueryString() == null ? "" : "?" + request.getQueryString());
        String body = getPayload(path, response.getContentType(), response.getContentAsByteArray(), response.getCharacterEncoding());
        log.info("HTTP RESPONSE {} {} | status={} | durationMs={} | body={}",
                request.getMethod(), path, response.getStatus(), durationMs, body);
    }

    private String getPayload(String path, String contentType, byte[] content, String characterEncoding) {
        if (isExtractEndpoint(path)) {
            return "<redacted>";
        }

        if (content == null || content.length == 0) {
            return "<empty>";
        }

        MediaType mediaType = parseMediaType(contentType);
        if (mediaType == null || !isVisible(mediaType)) {
            return "<binary " + content.length + " bytes>";
        }

        Charset charset = resolveCharset(characterEncoding);
        String payload = new String(content, charset);
        if (payload.length() > MAX_PAYLOAD_LENGTH) {
            return payload.substring(0, MAX_PAYLOAD_LENGTH) + "...<truncated>";
        }
        return payload;
    }

    private boolean isExtractEndpoint(String path) {
        return path != null && path.contains("/api/v1/pages/") && path.contains("/extract");
    }

    private MediaType parseMediaType(String contentType) {
        if (contentType == null || contentType.isBlank()) {
            return null;
        }
        try {
            return MediaType.parseMediaType(contentType);
        } catch (IllegalArgumentException ignored) {
            return null;
        }
    }

    private boolean isVisible(MediaType mediaType) {
        for (MediaType visibleType : VISIBLE_TYPES) {
            if (visibleType.includes(mediaType)) {
                return true;
            }
        }
        return false;
    }

    private Charset resolveCharset(String characterEncoding) {
        if (characterEncoding == null || characterEncoding.isBlank()) {
            return StandardCharsets.UTF_8;
        }
        try {
            return Charset.forName(characterEncoding);
        } catch (Exception ignored) {
            return StandardCharsets.UTF_8;
        }
    }

    private ContentCachingRequestWrapper wrapRequest(HttpServletRequest request) {
        if (request instanceof ContentCachingRequestWrapper wrapper) {
            return wrapper;
        }
        return new ContentCachingRequestWrapper(request);
    }

    private ContentCachingResponseWrapper wrapResponse(HttpServletResponse response) {
        if (response instanceof ContentCachingResponseWrapper wrapper) {
            return wrapper;
        }
        return new ContentCachingResponseWrapper(response);
    }
}
