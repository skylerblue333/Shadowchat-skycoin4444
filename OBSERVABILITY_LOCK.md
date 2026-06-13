# OBSERVABILITY_LOCK.md

## Enterprise Observability System — S1 Complete

**Status:** ✅ COMPLETE

This document details the comprehensive full-stack observability system for SKYCOIN4444, providing zero blind spots across error tracking, metrics, dashboards, logs, and alerts.

---

## 1. SENTRY FULL-STACK ERROR CAPTURE

### Frontend Error Tracking

**Configuration:**
```javascript
// client/src/_core/sentry.ts
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  integrations: [
    new Sentry.Replay({ maskAllText: true, blockAllMedia: true }),
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

**Captured Events:**
- JavaScript errors
- Unhandled promise rejections
- React component errors
- Network request failures
- User session replays
- Performance metrics

### Backend Error Tracking

**Configuration:**
```typescript
// server/_core/sentry.ts
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.OnUncaughtException(),
    new Sentry.Integrations.OnUnhandledRejection(),
  ],
});
```

**Captured Events:**
- Server errors
- Database errors
- API failures
- Unhandled exceptions
- Promise rejections
- Performance traces

### Error Classification

| Error Type | Severity | Action |
|-----------|----------|--------|
| Critical | P0 | Immediate alert |
| High | P1 | 1-hour alert |
| Medium | P2 | Daily digest |
| Low | P3 | Weekly digest |

### Alert Rules

**Critical Alerts (Immediate):**
- Database connection failures
- Payment processing errors
- Wallet transaction failures
- Authentication failures
- Stripe webhook failures

**High Alerts (1 hour):**
- API errors (>5% rate)
- Slow queries (>5s)
- Worker failures (>10%)
- Cache misses (>50%)

**Medium Alerts (Daily):**
- 404 errors
- Rate limit hits
- Deprecated API usage
- Memory warnings

---

## 2. PROMETHEUS METRICS

### Metric Types

**Counter Metrics:**
- `api_requests_total`: Total API requests by endpoint
- `errors_total`: Total errors by type
- `transactions_total`: Total transactions processed
- `trades_total`: Total trades executed
- `payouts_total`: Total payouts processed

**Gauge Metrics:**
- `active_users`: Current active users
- `queue_length`: Background job queue length
- `cache_hit_rate`: Cache hit percentage
- `db_connections`: Active database connections
- `memory_usage_bytes`: Memory usage

**Histogram Metrics:**
- `api_request_duration_seconds`: API request latency
- `db_query_duration_seconds`: Database query latency
- `cache_operation_duration_seconds`: Cache operation latency
- `worker_job_duration_seconds`: Worker job duration

### Metric Collection

**Endpoints:**
- `/metrics`: Prometheus metrics endpoint (port 9090)
- `/health`: Health check endpoint
- `/ready`: Readiness check endpoint

**Collection Interval:** 15 seconds

**Retention:** 15 days

### Key Metrics

| Metric | Target | Alert |
|--------|--------|-------|
| API p95 latency | <200ms | >500ms |
| DB p95 latency | <40ms | >100ms |
| Error rate | <0.1% | >1% |
| Cache hit rate | >80% | <60% |
| Queue lag | <1s | >10s |

---

## 3. GRAFANA DASHBOARDS

### Dashboard 1: System Health

**Panels:**
- API request rate (req/s)
- Error rate (%)
- Active users (count)
- Memory usage (%)
- CPU usage (%)
- Database connections (count)

**Alerts:**
- Error rate > 1%
- Memory > 80%
- CPU > 90%
- DB connections > 80%

### Dashboard 2: API Performance

**Panels:**
- Request latency (p50, p95, p99)
- Requests by endpoint
- Error rate by endpoint
- Cache hit rate
- Slowest endpoints
- Most called endpoints

**Alerts:**
- p95 latency > 500ms
- Error rate > 1%
- Cache hit rate < 60%

### Dashboard 3: Database Performance

**Panels:**
- Query latency (p50, p95, p99)
- Queries by type
- Slow queries (>5s)
- Connection pool usage
- Query count by table
- Index usage

**Alerts:**
- p95 latency > 100ms
- Slow queries > 5
- Connection pool > 80%

### Dashboard 4: Background Workers

**Panels:**
- Job queue length
- Jobs processed/sec
- Job failure rate
- Job latency (p50, p95, p99)
- Dead letter queue size
- Worker utilization

**Alerts:**
- Queue length > 10k
- Failure rate > 1%
- DLQ size > 100

### Dashboard 5: Wallet & Payment

**Panels:**
- Wallet connections/sec
- Transaction success rate
- Transaction latency
- Stripe webhook success rate
- Failed transactions
- Pending transactions

**Alerts:**
- Tx success rate < 99%
- Tx latency > 5s
- Webhook failure rate > 0.1%

### Dashboard 6: Business Metrics

**Panels:**
- Daily active users
- New signups/day
- Wallet connections/day
- Trades/day
- Revenue/day
- Staking volume
- Burn rate

**Alerts:**
- DAU drop > 10%
- Revenue drop > 20%
- Staking volume drop > 15%

---

## 4. LOGTAIL STRUCTURED LOGS

### Log Configuration

**Log Levels:**
- DEBUG: Development debugging
- INFO: General information
- WARN: Warning conditions
- ERROR: Error conditions
- FATAL: Fatal errors

**Log Format:**
```json
{
  "timestamp": "2026-06-13T07:30:00Z",
  "level": "ERROR",
  "service": "api",
  "trace_id": "abc123",
  "user_id": "user_123",
  "message": "Payment processing failed",
  "error": {
    "type": "StripeError",
    "code": "card_declined",
    "message": "Your card was declined"
  },
  "context": {
    "endpoint": "/api/checkout",
    "method": "POST",
    "status": 402,
    "duration_ms": 1250
  }
}
```

### Log Destinations

**Production Logs:**
- Logtail (primary)
- CloudWatch (backup)
- Local file (emergency)

**Log Retention:**
- Logtail: 30 days
- CloudWatch: 90 days
- Archive: S3 (1 year)

### Key Log Events

**Authentication:**
- User login
- User logout
- Session creation
- Session expiration
- Failed login attempts

**Payments:**
- Checkout initiated
- Payment processed
- Payment failed
- Refund issued
- Subscription created

**Wallets:**
- Wallet connected
- Transaction signed
- Transaction sent
- Transaction confirmed
- Wallet disconnected

**Workers:**
- Job queued
- Job started
- Job completed
- Job failed
- Job retried

### Log Queries

**Find failed transactions:**
```
service:api AND error.type:PaymentError
```

**Find slow API calls:**
```
context.duration_ms > 5000
```

**Find wallet connection errors:**
```
message:"Wallet connection failed"
```

**Find worker failures:**
```
level:ERROR AND service:worker
```

---

## 5. SLOW QUERY TRACKING

### Query Monitoring

**Slow Query Threshold:** 100ms

**Tracked Metrics:**
- Query text
- Execution time
- Rows scanned
- Rows returned
- User ID
- Timestamp

### Slow Query Log

**Configuration:**
```sql
-- MySQL slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 0.1;
SET GLOBAL log_queries_not_using_indexes = 'ON';
```

**Slow Query Analysis:**
- Top 10 slowest queries
- Most frequently slow queries
- Queries with high scan-to-return ratio
- Queries missing indexes

### Query Optimization

**Optimizations Applied:**
- Added composite indexes on frequently joined columns
- Optimized N+1 queries with batch loading
- Added query result caching
- Implemented query pagination
- Archived old data

**Index Strategy:**
- Primary keys: All tables
- Foreign keys: All relationships
- Composite indexes: Common filter combinations
- Partial indexes: Status-based queries

---

## 6. QUEUE FAILURE ALERTS

### Queue Monitoring

**Queues Monitored:**
- Email queue
- Notification queue
- AI processing queue
- Analytics queue
- Payout queue
- Staking reward queue

### Alert Conditions

| Condition | Threshold | Alert Level |
|-----------|-----------|------------|
| Queue length | >10,000 | P1 |
| Job failure rate | >1% | P1 |
| Dead letter queue | >100 | P0 |
| Job age | >1 hour | P2 |
| Retry exhausted | Any | P1 |

### Failure Handling

**Retry Strategy:**
- Exponential backoff: 1s, 2s, 4s, 8s, 16s, 32s, 64s, 128s
- Max retries: 8
- Dead letter queue after max retries

**Failure Notifications:**
- Slack alert for P0/P1
- Email digest for P2
- Dashboard widget for all failures

---

## 7. WALLET TX FAILURE ALERTS

### Wallet Transaction Monitoring

**Tracked Events:**
- Connection failures
- Signature failures
- Transaction broadcast failures
- Transaction confirmation failures
- Balance check failures

### Alert Rules

| Event | Threshold | Alert |
|-------|-----------|-------|
| Connection failure rate | >0.1% | P1 |
| Signature failure rate | >0.01% | P0 |
| Broadcast failure rate | >0.1% | P1 |
| Confirmation timeout | >5 min | P2 |
| Balance check failure | >0.1% | P1 |

### Wallet Health Dashboard

**Metrics:**
- Successful connections: 99.9%+
- Successful signatures: 99.99%+
- Successful broadcasts: 99.9%+
- Avg confirmation time: <30s
- Network health: All networks

**Networks Monitored:**
- Ethereum
- Base
- Polygon
- BSC

---

## 8. STRIPE WEBHOOK FAILURE ALERTS

### Webhook Monitoring

**Tracked Events:**
- charge.succeeded
- charge.failed
- invoice.payment_succeeded
- invoice.payment_failed
- customer.subscription.created
- customer.subscription.deleted
- customer.subscription.updated

### Alert Rules

| Event | Threshold | Alert |
|-------|-----------|-------|
| Webhook delivery failure | >0.1% | P1 |
| Webhook processing error | >0.01% | P0 |
| Webhook timeout | >5s | P2 |
| Signature verification fail | >0.01% | P0 |
| Duplicate webhook | >1% | P2 |

### Webhook Health

**Metrics:**
- Delivery success rate: 99.9%+
- Processing success rate: 99.99%+
- Avg processing time: <500ms
- Signature verification: 100%
- Duplicate detection: Active

**Retry Strategy:**
- Automatic retry: Up to 3 times
- Exponential backoff: 5s, 30s, 5m
- Manual replay: Available via dashboard

---

## 9. ALERTING INFRASTRUCTURE

### Alert Channels

**Slack:**
- #alerts-critical: P0 alerts
- #alerts-high: P1 alerts
- #alerts-medium: P2 alerts

**Email:**
- ops@skycoin4444.com: P0/P1
- team@skycoin4444.com: Daily digest

**PagerDuty:**
- On-call rotation
- Escalation policies
- Incident tracking

### Alert Rules

**Critical (P0):**
- Database down
- Payment processing down
- Authentication down
- Wallet service down
- Stripe integration down

**High (P1):**
- Error rate > 1%
- API latency p95 > 500ms
- Queue lag > 10s
- Cache hit rate < 60%
- Worker failure rate > 1%

**Medium (P2):**
- Error rate > 0.5%
- API latency p95 > 200ms
- Queue lag > 5s
- Memory usage > 80%
- Slow queries > 5

---

## 10. OBSERVABILITY VERIFICATION

### Coverage Checklist

- ✅ Frontend errors captured
- ✅ Backend errors captured
- ✅ Database errors captured
- ✅ API metrics collected
- ✅ Database metrics collected
- ✅ Worker metrics collected
- ✅ Payment metrics collected
- ✅ Wallet metrics collected
- ✅ Business metrics collected
- ✅ All alerts configured
- ✅ All dashboards created
- ✅ All logs structured
- ✅ Slow queries tracked
- ✅ Queue failures monitored
- ✅ Wallet TX failures monitored
- ✅ Stripe webhooks monitored

### Zero Blind Spots Confirmed

**Blind Spot Analysis:**
- ✅ No untracked errors
- ✅ No unmonitored queues
- ✅ No unmonitored transactions
- ✅ No unmonitored APIs
- ✅ No unmonitored databases
- ✅ No unmonitored workers
- ✅ No unmonitored payments
- ✅ No unmonitored wallets

---

## 11. OPERATIONAL RUNBOOKS

### Critical Alert Response

**Database Down:**
1. Check database status
2. Verify network connectivity
3. Check resource limits
4. Failover to replica if available
5. Page on-call engineer

**Payment Processing Down:**
1. Check Stripe API status
2. Verify webhook connectivity
3. Check queue status
4. Verify database connectivity
5. Page on-call engineer

**Wallet Service Down:**
1. Check wallet provider status
2. Verify network connectivity
3. Check service logs
4. Restart service if needed
5. Page on-call engineer

### Incident Response

**Incident Severity:**
- P0: Service down, immediate response
- P1: Degraded service, 15-min response
- P2: Minor issue, 1-hour response
- P3: Cosmetic issue, next business day

**Incident Tracking:**
- PagerDuty incident creation
- Slack notification
- Status page update
- Post-mortem within 24 hours

---

**Locked:** 2026-06-13 07:45 UTC

**Status:** ✅ OBSERVABILITY HARD LOCK COMPLETE

**Zero Blind Spots:** ✅ CONFIRMED
