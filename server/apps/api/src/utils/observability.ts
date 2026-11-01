// ---------------------------------------------------------------------------
// Span attribute constants (OTel semantic conventions + LYRA custom)
// ---------------------------------------------------------------------------

// GenAI semconv attributes — https://opentelemetry.io/docs/specs/semconv/gen-ai/
export const GEN_AI_ATTR_OPERATION_NAME = 'gen_ai.operation.name'
export const GEN_AI_ATTR_REQUEST_MODEL = 'gen_ai.request.model'
export const GEN_AI_ATTR_RESPONSE_MODEL = 'gen_ai.response.model'
export const GEN_AI_ATTR_SYSTEM = 'gen_ai.system'
export const GEN_AI_ATTR_USAGE_INPUT_TOKENS = 'gen_ai.usage.input_tokens'
export const GEN_AI_ATTR_USAGE_OUTPUT_TOKENS = 'gen_ai.usage.output_tokens'

// LYRA custom span attributes
export const LYRA_ATTR_BILLING_FLUX_CONSUMED = 'lyra.billing.flux_consumed'
export const LYRA_ATTR_GEN_AI_INPUT_MESSAGES = 'lyra.gen_ai.input.messages'
export const LYRA_ATTR_GEN_AI_INPUT_TEXT = 'lyra.gen_ai.input.text'
export const LYRA_ATTR_GEN_AI_OPERATION_KIND = 'lyra.gen_ai.operation.kind'
export const LYRA_ATTR_GEN_AI_OLLAMA_THINK = 'lyra.gen_ai.ollama.think'
export const LYRA_ATTR_GEN_AI_OUTPUT_FULL_TEXT = 'lyra.gen_ai.output.full_text'
export const LYRA_ATTR_GEN_AI_OUTPUT_TEXT = 'lyra.gen_ai.output.text'
export const LYRA_ATTR_GEN_AI_STREAM = 'lyra.gen_ai.stream'
export const LYRA_ATTR_GEN_AI_STREAM_INTERRUPTED = 'lyra.gen_ai.stream_interrupted'

// LYRA router gateway span attributes (in-process LLM/TTS routing — KTD-3).
// All prefixed `lyra.gen_ai.gateway.*` to stay under the existing `lyra.gen_ai.*`
// namespace already used by `lyra.gen_ai.stream_interrupted`.
export const LYRA_ATTR_GEN_AI_GATEWAY_UPSTREAM_URL = 'lyra.gen_ai.gateway.upstream.url'
export const LYRA_ATTR_GEN_AI_GATEWAY_UPSTREAM_INDEX = 'lyra.gen_ai.gateway.upstream.index'
export const LYRA_ATTR_GEN_AI_GATEWAY_KEY_ID = 'lyra.gen_ai.gateway.key.id'
export const LYRA_ATTR_GEN_AI_GATEWAY_FALLBACK_DEPTH = 'lyra.gen_ai.gateway.fallback.depth'
export const LYRA_ATTR_GEN_AI_GATEWAY_FALLBACK_REASON = 'lyra.gen_ai.gateway.fallback.reason'

// Server attributes
export const SERVER_ATTR_ADDRESS = 'server.address'
export const SERVER_ATTR_PORT = 'server.port'

// ---------------------------------------------------------------------------
// Metric name constants
// ---------------------------------------------------------------------------

// HTTP — https://opentelemetry.io/docs/specs/semconv/http/http-metrics/
export const METRIC_HTTP_SERVER_REQUEST_DURATION = 'http.server.request.duration'
export const METRIC_HTTP_SERVER_ACTIVE_REQUESTS = 'http.server.active_requests'

// Auth & user (LYRA custom)
export const METRIC_AUTH_ATTEMPTS = 'auth.attempts'
export const METRIC_AUTH_FAILURES = 'auth.failures'
export const METRIC_USER_REGISTERED = 'user.registered'
export const METRIC_USER_LOGIN = 'user.login'

// Engagement (LYRA custom)
export const METRIC_CHAT_MESSAGES = 'chat.messages'
export const METRIC_CHARACTER_CREATED = 'character.created'
export const METRIC_CHARACTER_DELETED = 'character.deleted'
export const METRIC_CHARACTER_ENGAGEMENT = 'character.engagement'
export const METRIC_WS_CONNECTIONS_ACTIVE = 'ws.connections.active'
export const METRIC_WS_USERS_ONLINE = 'ws.users.online'
export const METRIC_WS_MESSAGES_SENT = 'ws.messages.sent'
export const METRIC_WS_MESSAGES_RECEIVED = 'ws.messages.received'

// Revenue (LYRA custom)
export const METRIC_STRIPE_CHECKOUT_CREATED = 'stripe.checkout.created'
export const METRIC_STRIPE_CHECKOUT_COMPLETED = 'stripe.checkout.completed'
export const METRIC_STRIPE_EVENTS = 'stripe.events'
export const METRIC_FLUX_INSUFFICIENT_BALANCE = 'flux.insufficient_balance'

// GenAI — https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-metrics/
export const METRIC_GEN_AI_CLIENT_OPERATION_DURATION = 'gen_ai.client.operation.duration'
export const METRIC_GEN_AI_CLIENT_OPERATION_COUNT = 'gen_ai.client.operation.count'
export const METRIC_GEN_AI_CLIENT_TOKEN_USAGE_INPUT = 'gen_ai.client.token.usage.input'
export const METRIC_GEN_AI_CLIENT_TOKEN_USAGE_OUTPUT = 'gen_ai.client.token.usage.output'
export const METRIC_FLUX_CONSUMED = 'lyra.billing.flux.consumed'

// LYRA billing — credit/debit visibility beyond raw consumption
export const METRIC_LYRA_FLUX_CREDITED = 'lyra.billing.flux.credited'
// Streaming-only: token already streamed to user but post-stream debit failed.
// Real revenue leak — every >0 sample should page. NOT covered by DB latency /
// HTTP 5xx alerts because the response was 2xx and the catch path is silent.
export const METRIC_LYRA_FLUX_UNBILLED = 'lyra.billing.flux.unbilled'
export const METRIC_LYRA_TTS_CHARS = 'lyra.billing.tts.chars'
export const METRIC_LYRA_TTS_PREFLIGHT_REJECTIONS = 'lyra.billing.tts.preflight_rejections'

// LYRA observability — self-monitoring for the metric pipeline
export const METRIC_LYRA_OBSERVABILITY_READ_ERRORS = 'lyra.observability.read_errors'

// LYRA database — local pg pool capacity and queue state
export const METRIC_LYRA_DB_POOL_CONNECTIONS = 'lyra.db.pool.connections'

// LYRA revenue — actual money in (smallest currency unit, e.g. cents)
export const METRIC_LYRA_STRIPE_REVENUE = 'lyra.stripe.revenue'

// LYRA email — transactional delivery health
export const METRIC_LYRA_EMAIL_SEND = 'lyra.email.send'
export const METRIC_LYRA_EMAIL_FAILURES = 'lyra.email.failures'
export const METRIC_LYRA_EMAIL_DURATION = 'lyra.email.duration'

// LYRA rate limiting — abuse / attack visibility
export const METRIC_LYRA_RATE_LIMIT_BLOCKED = 'lyra.rate_limit.blocked'

// LYRA GenAI — stream quality
export const METRIC_LYRA_GEN_AI_STREAM_INTERRUPTED = 'lyra.gen_ai.stream.interrupted'
export const METRIC_GEN_AI_CLIENT_FIRST_TOKEN_DURATION = 'gen_ai.client.first_token.duration'

// LYRA router gateway — in-process LLM/TTS routing fallback / health signals.
//
// fallback_count    — each retry attempt (per failing key). Labels: provider,
//                     from_key, reason. Dashboard sum gives 24h fallback volume.
// upstream_errors   — upstream-side error responses. Labels: provider, status_code.
// key_exhausted     — all keys in a single request failed. Labels: provider.
//                     **Primary alert source for "user-facing degradation"**.
// same_status_exhaustion
//                  — all keys failed in one request *with the same status code*.
//                     Strong signal of shared-backend (account-level) rate limit
//                     that ordinary fallback can't help with. Drives D33's blind
//                     spot detection per adversarial review.
// config_reload    — local in-memory configKV cache reloaded. Labels: source
//                     (`pubsub` | `ttl` | `manual`), service_instance_id.
// decrypt_failures — envelope-crypto decryption auth-tag failures. Labels:
//                     provider, key_entry_id. >0 = config corruption or rotation
//                     misstep.
// subscriber_state — Pub/Sub subscriber lifecycle transitions. Labels: state
//                     (`subscribed` | `reconnecting` | `error` | `closed`).
// config_invalid_hmac
//                  — Pub/Sub invalidation messages dropped due to HMAC mismatch
//                     (forged or replayed). >0 = investigate Redis access.
export const METRIC_LYRA_GEN_AI_GATEWAY_FALLBACK_COUNT = 'lyra.gen_ai.gateway.fallback.count'
export const METRIC_LYRA_GEN_AI_GATEWAY_UPSTREAM_ERRORS = 'lyra.gen_ai.gateway.upstream.errors'
export const METRIC_LYRA_GEN_AI_GATEWAY_KEY_EXHAUSTED_COUNT = 'lyra.gen_ai.gateway.key.exhausted'
export const METRIC_LYRA_GEN_AI_GATEWAY_SAME_STATUS_EXHAUSTION = 'lyra.gen_ai.gateway.same_status_exhaustion'
export const METRIC_LYRA_GEN_AI_GATEWAY_CONFIG_RELOAD = 'lyra.gen_ai.gateway.config.reload'
export const METRIC_LYRA_GEN_AI_GATEWAY_DECRYPT_FAILURES = 'lyra.gen_ai.gateway.decrypt.failures'
export const METRIC_LYRA_GEN_AI_GATEWAY_SUBSCRIBER_STATE = 'lyra.gen_ai.gateway.subscriber_state'
export const METRIC_LYRA_GEN_AI_GATEWAY_CONFIG_INVALID_HMAC = 'lyra.gen_ai.gateway.config.invalid_hmac'
// TTSpool (per app_id concurrency pool) load-balancer signals.
// pool_slot_rejected — capacity-aware routing skipped a pool because its app_id
//                      was already at the concurrency cap (labels: provider, app_id).
// pool_saturation_marked
//                    — a pool was circuit-broken after exhausting with a 429
//                      (labels: provider, app_id).
// pool_inflight      — cluster-wide gauge of current in-flight requests per pool,
//                      sourced from Redis (label: app_id). Dashboard must avg(),
//                      not sum() — every replica reports the same value.
export const METRIC_LYRA_GEN_AI_GATEWAY_POOL_SLOT_REJECTED = 'lyra.gen_ai.gateway.pool.slot_rejected'
export const METRIC_LYRA_GEN_AI_GATEWAY_POOL_SATURATION_MARKED = 'lyra.gen_ai.gateway.pool.saturation_marked'
export const METRIC_LYRA_GEN_AI_GATEWAY_POOL_INFLIGHT = 'lyra.gen_ai.gateway.pool.inflight'

// ---------------------------------------------------------------------------
// Canonical gen_ai.system values
// ---------------------------------------------------------------------------
//
// First emitter of `gen_ai.system` in this repo (see observability-conventions.md).
// Lock these values now so future adapters / providers don't fork the namespace.

export const GEN_AI_SYSTEM_OPENROUTER = 'openrouter'
export const GEN_AI_SYSTEM_AZURE_SPEECH = 'azure.speech'
export const GEN_AI_SYSTEM_DASHSCOPE_COSYVOICE = 'dashscope.cosyvoice'
export const GEN_AI_SYSTEM_VOLCENGINE_TTS = 'volcengine.tts'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getServerConnectionAttributes(baseUrl: string): Record<string, string | number> {
  const url = new URL(baseUrl)
  const attributes: Record<string, string | number> = {
    [SERVER_ATTR_ADDRESS]: url.hostname,
  }

  if (url.port) {
    attributes[SERVER_ATTR_PORT] = Number.parseInt(url.port, 10)
  }

  return attributes
}
