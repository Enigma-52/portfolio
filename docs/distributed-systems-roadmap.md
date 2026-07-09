# Distributed Systems: A Study Flow

A sequenced path for diving into distributed systems, built to introduce
vocabulary *before* the systems that assume it, and to alternate theory with a
concrete system so the ideas stay grounded.

**The one-line version:**
Define the words → learn the mechanism → see the opposite choice → name the
tradeoff → study real systems → pick up the engineering patterns as projects
demand them.

---

## The flow at a glance

```
  PHASE 0              PHASE 1              PHASE 2            PHASE 3
  Primitives      →    Language        →   Mechanism      →   The Tradeoff
  (the words the       (how we speak        (how machines       (naming the
   papers assume)       about correctness)   agree/diverge)      cost)

  • system & failure   • consistency        • consensus         • Dynamo
    models               models               (Raft → Paxos)      (the AP choice)
  • network & delivery • time & ordering                        • CAP / PACELC
  • replication &        (logical clocks)                       • quorums
    partitioning
  • theorems you'll
    see cited

                          ↓

  PHASE 4                         PHASE 5
  Real Systems & Synthesis  →     Engineering Patterns
  (it all combines)              (pull in as needed)

  • The Log (synthesis)           • idempotency / exactly-once
  • Bigtable                      • CDC + outbox
  • Dynamo (revisit)             • sagas / distributed transactions
  • Spanner                      • backpressure / load shedding
  • MapReduce                    • observability (traces/metrics/logs)
```

> **On "The Log":** it reads like an on-ramp but it's really a *capstone*. It
> assumes replication, partitioning, ordering, and consistency and then shows
> one abstraction unifying them. Skim it early for motivation if you like, but
> its real home is Phase 4, as synthesis.

---

## Phase 0 — Primitives: the words the papers assume

This is the real foundation. Every paper leans on a shared vocabulary of models,
guarantees, and named results and rarely re-defines it. Learn these as a
*glossary you can recognize on sight* (not memorize proofs), and papers stop
feeling like they're written in code. Each term below is one line; follow the
resources to go deeper on the ones that matter to you.

### System & failure models — the assumptions everything rests on
- **Node / process / message passing** — independent machines that share nothing and communicate only by sending messages.
- **Synchrony model** — *synchronous* (bounded delays & clocks), *asynchronous* (no bounds at all), *partially synchronous* (bounded eventually). Almost all real systems are the last one, and most impossibility results assume the middle one.
- **Failure models** — *crash-stop* (halts and stays down), *crash-recovery* (halts, later returns), *omission* (drops messages), *Byzantine* (arbitrary/malicious). Papers state which they tolerate.
- **Fault vs failure** — a fault is a defect; a failure is when it becomes observable. Fault tolerance = faults that never become failures.
- **Partial failure** — the defining trait of distribution: some components are down while others run, and no one has a global view.
- **The "slow vs dead" problem** — you cannot distinguish a crashed node from a slow one over an async network. This single fact motivates timeouts, leases, and quorums.
- **Failure detectors** — heartbeats, timeouts, *phi-accrual*; characterized by *completeness* (dead nodes get suspected) vs *accuracy* (live nodes don't).

### The network — the medium that lies to you
- **Link models** — *fair-loss*, *reliable*, *ordered* links, built up in layers.
- **Network partition** — the network splits into groups that can't talk; the "P" in CAP.
- **Latency vs bandwidth; tail latency** — p99 matters more than average once you fan out to many nodes.
- **Fallacies of Distributed Computing** — the [eight false assumptions](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing) (network is reliable, latency is zero, etc.) that sink naive designs.

### Communication & delivery semantics
- **RPC vs async messaging** — request/response coupling vs decoupled queues/logs.
- **Delivery guarantees** — *at-most-once*, *at-least-once*, *exactly-once*. Real "exactly-once" is at-least-once plus idempotency (a.k.a. *effectively once*).
- **Idempotency & deduplication** — making a repeated message harmless; the workhorse that makes retries safe.
- **Message ordering** — *FIFO* < *causal* < *total order*, in increasing strength and cost.
- **Broadcast abstractions** — *best-effort* → *reliable* → *causal* → *total-order (atomic)* broadcast. Key fact you'll meet again: **atomic broadcast is equivalent to consensus.**

### Time & ordering
- **Physical clocks** — wall-clock time, *drift*, *skew*, NTP; why you can't trust timestamps for ordering across machines.
- **Monotonic vs wall-clock time** — for measuring elapsed time vs naming an instant.
- **happens-before (→)** — the causal ordering relation; events not ordered by it are *concurrent*.
- **Logical clocks** — *Lamport clocks* (total order consistent with causality) and *vector clocks* (detect concurrency/conflicts). Depth lives in Phase 1.

### Replication — the shapes of "keep more than one copy"
- **Why replicate** — fault tolerance, lower read latency, more read throughput.
- **Topologies** — *single-leader*, *multi-leader*, *leaderless*. Most tradeoffs trace back to this choice.
- **Sync vs async replication; replication lag** — durability vs latency, and the staleness lag creates.
- **State machine replication (SMR)** — feed every replica the same ordered log of commands and they stay identical; the bridge from "log" to "consensus."
- **Write-ahead log (WAL)** — durability primitive inside a single node, and the unit SMR replicates.

### Partitioning / sharding — the shapes of "split the data up"
- **Why partition** — scale storage and write throughput past one machine.
- **Key-range vs hash partitioning** — range scans vs even spread; the classic tradeoff.
- **Consistent hashing & virtual nodes** — add/remove a node while moving minimal data (central to Dynamo).
- **Rebalancing & hot spots** — keeping load even as data and traffic shift.
- **Partitioning + replication together** — real systems do both; each partition is itself replicated.

### Consistency & correctness vocabulary
- **Safety vs liveness** — "nothing bad happens" vs "something good eventually happens." Every guarantee is one or the other.
- **Linearizability** — reads/writes appear to take effect instantly, in real-time order; the gold standard for single objects.
- **Serializability** — transactions appear to run one at a time; a *transaction* guarantee, different from linearizability.
- **Strict serializability** — both of the above at once.
- **Consistency vs consensus vs agreement** — often conflated; consensus is a *mechanism*, consistency is a *guarantee about reads*.
- **Quorums** — overlapping majorities; **quorum intersection** (`R + W > N`) is why a read sees the latest write.
- **Idempotence, commutativity, associativity** — algebraic properties that let you safely reorder, retry, or merge operations (the seed of *CRDTs*).

### Guarantees, transactions & the theorems you'll see cited
- **ACID & isolation levels** — read committed → snapshot → serializable; know what anomalies each permits.
- **Atomic commit** — *2PC* and *3PC*; and 2PC's blocking problem when the coordinator dies.
- **FLP impossibility** — in a fully async system, no deterministic algorithm guarantees consensus if even one node can crash. Explains why real systems assume partial synchrony or use randomness/timeouts.
- **CAP** — under a partition you choose consistency *or* availability. (Nuance comes in Phase 3.)
- **Two Generals problem** — you can't guarantee agreement over an unreliable channel with a bounded number of messages; the intuition pump for the above.
- **The end-to-end argument** — put correctness guarantees at the endpoints, not the network; a recurring design principle.

**Resources for this phase:**
- DDIA, Ch. 5 (Replication), 6 (Partitioning), 7 (Transactions), 8 (Trouble with Distributed Systems), 9 (Consistency & Consensus) — this *is* Phase 0 in book form.
- Martin Kleppmann's free [Distributed Systems lecture series](https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB) (video companion to DDIA).
- [MIT 6.5840 (6.824) Distributed Systems](https://pdos.csail.mit.edu/6.824/) — labs + paper list if you want rigor.
- Jeff Hodges, [Notes on Distributed Systems for Young Bloods](https://www.somethingsimilar.com/2013/01/14/notes-on-distributed-systems-for-young-bloods/) — the practitioner's reality check.

---

## Phase 1 — Language: the vocabulary everything is spoken in

Short, high-leverage. Do this before the systems that use the words.

### Consistency models
- **Answers:** when I read, what am I promised about how fresh the data is?
- **Concepts:** linearizable → sequential → causal → eventual; read-your-writes, monotonic reads.
- **Resource:** DDIA Ch. 9; Kyle Kingsbury's [Jepsen consistency map](https://jepsen.io/consistency).

### Time and ordering
- **Answers:** without a shared clock, how do we say one event happened before another?
- **Concepts:** Lamport clocks → vector clocks → hybrid logical clocks; happens-before.
- **Why here:** vector clocks are the mechanism behind both consistency models and Dynamo's conflict detection, so learn them before Dynamo.
- **Resource:** Lamport, [Time, Clocks, and the Ordering of Events](https://lamport.azurewebsites.net/pubs/time-clocks.pdf).

---

## Phase 2 — Mechanism: how machines agree (or choose not to)

### Consensus — Raft first, then Paxos / ZAB
- **Answers:** how does a group of machines agree on the *order* of the log?
- **Concepts:** leader election, log replication, terms, commit index, safety vs liveness.
- **Why here:** this completes the question "the log" raised but didn't answer. Raft is designed to be understandable; start there.
- **Resources:** [Raft](https://raft.github.io/) (paper + visualization), then [Paxos Made Simple](https://lamport.azurewebsites.net/pubs/paxos-simple.pdf).

---

## Phase 3 — The tradeoff: the opposite design choice

### Dynamo — the counterpoint to the log
- **Answers:** what if we refuse to coordinate at all, and never say "no" to a write?
- **Concepts:** consistent hashing, quorums (N/R/W), vector clocks, hinted handoff, read repair, gossip membership.
- **Why here:** read it *after* consensus. Its whole design is "skip the coordination step," and that only lands once you know what coordination costs.
- **Resource:** [Dynamo (SOSP 2007)](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf).

### CAP / PACELC and quorums, formalized
- **Answers:** what exactly are you trading, and when?
- **Concepts:** consistency vs availability under partition (CAP), plus the latency dimension (PACELC); `R + W > N`.
- **Why here:** by now you've *seen* the tradeoff twice (log = CP-ish, Dynamo = AP). This step just names it precisely.

---

## Phase 4 — Real systems & synthesis: where it all combines

Read these once you have the pieces; each one is a payoff, not a starting point.

- **The Log** — [Jay Kreps' essay](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-data-s-unifying). The synthesis piece: it ties replication, ordering, integration, stream processing, and the log/table duality into one abstraction. It only fully lands *here*, after Phases 0–3, because it assumes all of them. (This is the essay the blog's "The Log" series retells.)
- **Bigtable** — a wide-column store on a distributed filesystem; log + serving layer at scale.
- **Dynamo (revisit)** — reread with Phase 3 vocabulary; it reads completely differently.
- **Spanner** — "what if you attack the time-and-ordering problem with hardware?" ([TrueTime](https://research.google/pubs/pub39966/)).
- **MapReduce** — batch computation as a distributed primitive; the ancestor of modern data processing.
- **Spine:** DDIA ties these together in roughly this order.

---

## Phase 5 — Engineering patterns: pull in as needed

These assume the theory above. Study them when a project demands them, not cold.

- **Idempotency / exactly-once** — turning at-least-once delivery into effectively-once with dedup keys and idempotent producers.
- **Change Data Capture + outbox** — the log applied to real databases (Debezium, logical decoding).
- **Sagas / distributed transactions** — 2PC vs saga/compensation, and when each fits.
- **Backpressure, rate limiting, load shedding** — staying stable under overload.
- **Observability** — distributed tracing (OpenTelemetry) and the difference between logs, metrics, and traces.

---

## Checkpoints

You understand a phase when you can answer its question without notes:

- **P0:** State the failure model and synchrony model a paper assumes, and explain `R + W > N` and why atomic broadcast equals consensus.
- **P1:** What's the difference between linearizable and causal consistency, with an example?
- **P2:** Walk through a Raft leader election and one log-replication round.
- **P3:** Given N=3, R=2, W=2, can a read ever be stale? When?
- **P4:** How does Spanner give external consistency without global coordination on every write?
- **P5:** How do you make a payment webhook safe to retry?

---

## The single spine

If you read only one thing alongside the papers: **Martin Kleppmann,
*Designing Data-Intensive Applications*.** Its chapters 5–9 essentially *are*
Phase 0, and it carries through Phases 1, 3, and 4 in close to this order. Slot
the Raft and Dynamo papers in at Phases 2 and 3, and read "The Log" as the
synthesis capstone once the rest is in place.
