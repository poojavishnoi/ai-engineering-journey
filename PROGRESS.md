# Progress

Tick each item off as you finish it. Each topic gets a note in `notes/`, and each project goes in `projects/`.

## Phase 1: How LLMs actually work
- [ ] **Week 1:** Tokens, embeddings, attention (the intuition), sampling & temperature
  - [x] Lesson 1: what an LLM is, built a tiny next-word model, temperature 0 vs 1, hallucination ([note](notes/01-what-is-an-llm.md), [code](weeks/week-01/01-tiny-llm.ts))
  - [x] Lesson 2: built a BPE tokenizer, solved the strawberry puzzle; made the tiny AI look back 2 words (0 new sentences, so it's a copy machine) ([note](notes/02-tokens.md), [tokenizer](weeks/week-01/02-tokenizer.ts), [memory experiment](weeks/week-01/03-looking-back-further.ts))
  - [ ] Embeddings
  - [ ] Attention (the intuition)
- [ ] **Week 2:** The raw Claude API: messages, system prompt, streaming, context window, cost
- [ ] **Week 3:** Tool calling & structured output; an agent loop from scratch
- [ ] **Week 4:** 🛠️ Project 1, a streaming chat app with generative UI

## Phase 2: Retrieval & evals
- [ ] **Week 5:** Embeddings & vector search (hand-written first, then a vector DB)
- [ ] **Week 6:** RAG done properly: chunking, hybrid search, reranking
- [ ] **Week 7:** Evals: test sets, LLM-as-judge, retrieval metrics
- [ ] **Week 8:** 🛠️ Project 2, a bug-triage copilot

## Phase 3: Agents in production
- [ ] **Week 9:** MCP: build an MCP server; multi-step agents
- [ ] **Week 10:** Guardrails, prompt injection, cost/latency, caching, tracing
- [ ] **Week 11:** AI on mobile: streaming in RN, on-device models (Ollama, transformers.js), voice & images
- [ ] **Week 12:** 🛠️ Capstone + design doc

## Every week
- [ ] 1 AI system design question
- [ ] A LinkedIn post every day
- [ ] Notes for every concept learned
