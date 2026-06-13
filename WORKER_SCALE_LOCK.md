# WORKER_SCALE_LOCK.md

## Background Engine Scale — S3 Complete

**Status:** ✅ COMPLETE

---

## 1. WORKER QUEUES

### Email Queue
- **Workers:** 10 instances
- **Throughput:** 1,000 emails/sec
- **Retry:** 8 attempts, exponential backoff
- **DLQ:** Emails after max retries

### Notification Queue
- **Workers:** 5 instances
- **Throughput:** 5,000 notifications/sec
- **Retry:** 8 attempts, exponential backoff
- **DLQ:** Notifications after max retries

### AI Processing Queue
- **Workers:** 20 instances
- **Throughput:** 500 AI requests/sec
- **Retry:** 3 attempts (AI ops are idempotent)
- **DLQ:** Failed AI requests

### Analytics Queue
- **Workers:** 5 instances
- **Throughput:** 10,000 events/sec
- **Retry:** 5 attempts
- **DLQ:** Failed analytics

### Payout Queue
- **Workers:** 3 instances
- **Throughput:** 100 payouts/sec
- **Retry:** 8 attempts, exponential backoff
- **DLQ:** Failed payouts

### Staking Reward Queue
- **Workers:** 2 instances
- **Throughput:** 1,000 rewards/sec
- **Retry:** 5 attempts
- **DLQ:** Failed rewards

---

## 2. RETRY LOGIC

### Exponential Backoff

**Formula:** `delay = baseDelay × (multiplier ^ attempt)`

**Configuration:**
- Base delay: 1 second
- Multiplier: 2
- Max delay: 128 seconds
- Max attempts: 8

**Backoff Schedule:**
- Attempt 1: 1s
- Attempt 2: 2s
- Attempt 3: 4s
- Attempt 4: 8s
- Attempt 5: 16s
- Attempt 6: 32s
- Attempt 7: 64s
- Attempt 8: 128s

### Retry Conditions

**Retry on:**
- Network errors
- Timeout errors
- 5xx server errors
- Rate limit errors (429)

**Don't retry:**
- 4xx client errors (except 429)
- Validation errors
- Authentication errors
- Authorization errors

---

## 3. DEAD LETTER QUEUE

### DLQ Management

**DLQ Monitoring:**
- Size: <100 messages
- Age: <24 hours
- Alert: >10 messages

**DLQ Processing:**
- Manual review
- Root cause analysis
- Fix and replay
- Archive after 30 days

### Job Replay

**Replay Process:**
1. Identify failed job
2. Fix underlying issue
3. Replay job from DLQ
4. Verify success
5. Archive job

**Replay Rate:** Max 100 jobs/sec

---

## 4. WORKER SCALING

### Auto-Scaling Rules

| Queue | Min | Max | Trigger |
|-------|-----|-----|---------|
| Email | 5 | 20 | Queue > 1000 |
| Notification | 3 | 15 | Queue > 5000 |
| AI | 10 | 50 | Queue > 500 |
| Analytics | 3 | 10 | Queue > 10000 |
| Payout | 2 | 10 | Queue > 100 |
| Staking | 1 | 5 | Queue > 500 |

### Scaling Metrics

- **Scale up:** Queue length > threshold
- **Scale down:** Queue empty for 5 minutes
- **Min workers:** Always running
- **Max workers:** Cost optimization

---

## 5. WORKER MONITORING

### Metrics

- Queue length
- Job success rate
- Job failure rate
- Job latency (p50, p95, p99)
- DLQ size
- Worker utilization

### Alerts

| Alert | Threshold | Action |
|-------|-----------|--------|
| Queue length | >10,000 | Scale up |
| Failure rate | >1% | Investigate |
| DLQ size | >100 | Review |
| Latency p95 | >5s | Investigate |

---

**Locked:** 2026-06-13 08:15 UTC

**Status:** ✅ WORKER SCALE COMPLETE
