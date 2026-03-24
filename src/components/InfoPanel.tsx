'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NodeData, ClusterKey, CLUSTER_COLORS } from '@/data/brainData';

// ─────────────────────────────────────────────────────────────────────────────

interface InfoPanelProps {
  node: NodeData | null;
  mode: 'recruiter' | 'technical';
  onClose: () => void;
}

// Lookup object replaces the ternary chain
const CLUSTER_LABELS: Record<ClusterKey, string> = {
  core:       'Core Identity',
  biomedical: 'Neural & Biomedical',
  ai:         'AI & Language',
  data:       'Data Infrastructure',
  civic:      'Civic Systems',
};

// Content stagger variants
const FADE_UP = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" as const },
  },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function InfoPanel({ node, mode, onClose }: InfoPanelProps) {
  const content = node
    ? (mode === 'recruiter' ? node.recruiterMode : node.technicalMode)
    : null;
  const color = node ? CLUSTER_COLORS[node.cluster] : '#FFFFFF';

  return (
    <AnimatePresence>
      {node && content && (
        <motion.aside
          key={node.id}
          initial={{ x: 420, opacity: 0 }}
          animate={{ x: 0,   opacity: 1 }}
          exit={{   x: 420, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 40 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            top: 20, right: 20, bottom: 20,
            width: 380,
            zIndex: 40,
            display: 'flex',
            flexDirection: 'column',
            background: '#07090F',
            // Left border is the primary cluster-color accent
            borderLeft: `2px solid ${color}`,
            boxShadow: `-32px 0 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)`,
          }}
        >
          {/* Top accent line — gradient from cluster color to transparent */}
          <div style={{
            height: 1,
            flexShrink: 0,
            background: `linear-gradient(to right, ${color}70, transparent)`,
          }} />

          {/* ── Header ────────────────────────────────────────────────── */}
          <motion.div
            variants={FADE_UP} initial="hidden" animate="show"
            transition={{ delay: 0.06 }}
            style={{ padding: '22px 26px 18px', flexShrink: 0 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              {/* Cluster label — monospace system tag */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 8,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: color,
                opacity: 0.8,
              }}>
                {CLUSTER_LABELS[node.cluster]}
              </span>

              {/* Close — Tailwind hover via className (no direct DOM mutation) */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-[rgba(232,228,220,0.3)] hover:text-[rgba(232,228,220,0.75)] transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, lineHeight: 1 }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Project name — Cormorant Garamond, the typography signature */}
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 27,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: 'rgba(232,228,220,0.92)',
              marginTop: 12,
            }}>
              {node.label}
            </h2>

            {/* Short description — Cormorant italic, editorial */}
            <p style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 13.5,
              lineHeight: 1.55,
              color: 'rgba(232,228,220,0.4)',
              marginTop: 9,
            }}>
              {node.shortDescription}
            </p>
          </motion.div>

          {/* ── Hairline divider ──────────────────────────────────────── */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.055)', flexShrink: 0 }} />

          {/* ── Scrollable body ───────────────────────────────────────── */}
          <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '22px 26px' }}>

            {/* Description — long-form Cormorant body */}
            <motion.p
              variants={FADE_UP} initial="hidden" animate="show"
              transition={{ delay: 0.14 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 14.5,
                lineHeight: 1.8,
                color: 'rgba(232,228,220,0.62)',
                marginBottom: 26,
              }}
            >
              {content.description}
            </motion.p>

            {/* Impact / Highlights */}
            <motion.div
              variants={FADE_UP} initial="hidden" animate="show"
              transition={{ delay: 0.2 }}
              style={{ marginBottom: 26 }}
            >
              <SectionRule
                label={mode === 'technical' ? 'Technical Highlights' : 'Impact'}
                color={color}
              />
              <ol style={{ listStyle: 'none', padding: 0, margin: '14px 0 0' }}>
                {content.impact.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, marginBottom: 11 }}>
                    {/* Numbered prefix — monospace accent */}
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 8,
                      fontWeight: 500,
                      color: color,
                      opacity: 0.75,
                      flexShrink: 0,
                      marginTop: 5,
                      letterSpacing: '0.05em',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: 'rgba(232,228,220,0.58)',
                    }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* Stack */}
            <motion.div
              variants={FADE_UP} initial="hidden" animate="show"
              transition={{ delay: 0.27 }}
            >
              <SectionRule label="Stack" color={color} />
              {/* Inline dot-separated stack tags in mono — no pill boxes */}
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.08em',
                color: `${color}95`,
                marginTop: 12,
                lineHeight: 2,
              }}>
                {node.techStack.join('  ·  ')}
              </p>
            </motion.div>

            {/* GitHub link */}
            {node.githubLink && (
              <motion.a
                variants={FADE_UP} initial="hidden" animate="show"
                transition={{ delay: 0.33 }}
                href={node.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-[rgba(232,228,220,0.32)] hover:text-[rgba(232,228,220,0.68)] transition-colors"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textDecoration: 'none' }}
              >
                ↗ View source
              </motion.a>
            )}
          </div>

          {/* ── Footer ────────────────────────────────────────────────── */}
          <div style={{ flexShrink: 0, padding: '10px 26px 16px' }}>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 11 }} />
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 7.5,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(232,228,220,0.15)',
              textAlign: 'center',
            }}>
              Click graph to dismiss
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

// ─── Section rule — editorial header with trailing gradient line ─────────────

function SectionRule({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 7.5,
        letterSpacing: '0.24em',
        textTransform: 'uppercase',
        color: 'rgba(232,228,220,0.3)',
        flexShrink: 0,
      }}>
        {label}
      </span>
      <div style={{
        flex: 1, height: 1,
        background: `linear-gradient(to right, rgba(255,255,255,0.07), transparent)`,
      }} />
    </div>
  );
}
