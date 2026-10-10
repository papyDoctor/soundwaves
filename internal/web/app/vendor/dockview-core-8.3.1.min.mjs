var qr=Object.create;var pn=Object.defineProperty;var Qr=Object.getOwnPropertyDescriptor;var ea=Object.getOwnPropertyNames;var ta=Object.getPrototypeOf,ia=Object.prototype.hasOwnProperty;var na=(f,F)=>()=>{try{return F||f((F={exports:{}}).exports,F),F.exports}catch(pe){throw F=0,pe}};var oa=(f,F,pe,J)=>{if(F&&typeof F=="object"||typeof F=="function")for(let te of ea(F))!ia.call(f,te)&&te!==pe&&pn(f,te,{get:()=>F[te],enumerable:!(J=Qr(F,te))||J.enumerable});return f};var ra=(f,F,pe)=>(pe=f!=null?qr(ta(f)):{},oa(F||!f||!f.__esModule?pn(pe,"default",{value:f,enumerable:!0}):pe,f));var fn=na((je,bn)=>{(function(f,F){typeof je=="object"&&typeof bn<"u"?F(je):typeof define=="function"&&define.amd?define(["exports"],F):(f=typeof globalThis<"u"?globalThis:f||self,F(f["dockview-core"]={}))})(je,function(f){if(Object.defineProperties(f,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),typeof document<"u"){let e=document.createElement("style");e.textContent=`.dv-drop-target-container {
  position: absolute;
  z-index: 9999;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  pointer-events: none;
  overflow: hidden;
  --dv-transition-duration: 300ms;
}
.dv-drop-target-container .dv-drop-target-anchor {
  position: relative;
  border: var(--dv-drag-over-border);
  background-color: var(--dv-drag-over-background-color);
  opacity: 1;
  /* GPU optimizations */
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  contain: layout paint;
  transition: opacity var(--dv-transition-duration) ease-in, top var(--dv-transition-duration) ease-out, left var(--dv-transition-duration) ease-out, width var(--dv-transition-duration) ease-out, height var(--dv-transition-duration) ease-out;
}
.dv-drop-target {
  position: relative;
  --dv-transition-duration: 70ms;
}
.dv-drop-target > .dv-drop-target-dropzone {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  z-index: 1000;
  pointer-events: none;
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border: var(--dv-drag-over-border);
  background-color: var(--dv-drag-over-background-color);
  transition: top var(--dv-transition-duration) ease-out, left var(--dv-transition-duration) ease-out, width var(--dv-transition-duration) ease-out, height var(--dv-transition-duration) ease-out, opacity var(--dv-transition-duration) ease-out;
  will-change: transform;
  pointer-events: none;
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-top.dv-drop-target-small-vertical {
  border-top: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-bottom.dv-drop-target-small-vertical {
  border-bottom: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-left.dv-drop-target-small-horizontal {
  border-left: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-right.dv-drop-target-small-horizontal {
  border-right: 1px solid var(--dv-drag-over-border-color);
}

.dv-dnd-compass {
  z-index: 1001;
}

.dv-dnd-compass-cell {
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid var(--dv-dnd-compass-color, #1f9cf0);
  background-color: var(--dv-dnd-compass-cell-color, rgba(31, 156, 240, 0.25));
}

.dv-dnd-compass-cell-edge {
  border-style: dashed;
  background-color: var(--dv-dnd-compass-edge-cell-color, rgba(31, 156, 240, 0.12));
}

.dv-dnd-compass-cell-active {
  background-color: var(--dv-dnd-compass-active-cell-color, rgba(31, 156, 240, 0.5));
  border-style: solid;
}

.dv-dnd-compass-edge-preview {
  z-index: 1000;
  box-sizing: border-box;
  background-color: var(--dv-drag-over-background-color);
  border: var(--dv-drag-over-border);
}
.dv-dragged {
  transform: translate3d(0px, 0px, 0px); /* forces tab to be drawn on a separate layer (see https://github.com/microsoft/vscode/issues/18733) */
}

/* Applied to the ghost tab clone during drag so it shows the same border as a focused tab */
.dv-tab-ghost-drag {
  position: relative;
}
.dv-tab-ghost-drag::after {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  pointer-events: none;
  outline: 1px solid var(--dv-tab-divider-color) !important;
  outline-offset: -1px;
  z-index: 5;
}

.dv-tab {
  flex-shrink: 0;
}
.dv-tab:focus-visible, .dv-tab:has(:focus-visible) {
  position: relative;
}
.dv-tab:focus-visible::after, .dv-tab:has(:focus-visible)::after {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  pointer-events: none;
  outline: 1px solid var(--dv-tab-divider-color) !important;
  outline-offset: -1px;
  z-index: 5;
}
.dv-tab.dv-tab-dragging .dv-default-tab-action {
  background-color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-tab.dv-active-tab .dv-default-tab .dv-default-tab-action {
  visibility: visible;
}
.dv-tab.dv-inactive-tab .dv-default-tab .dv-default-tab-action {
  visibility: hidden;
}
.dv-tab.dv-inactive-tab .dv-default-tab:hover .dv-default-tab-action {
  visibility: visible;
}
@media (hover: none) {
  .dv-tab.dv-inactive-tab .dv-default-tab .dv-default-tab-action {
    visibility: visible;
  }
}
.dv-tab .dv-default-tab {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dv-tab .dv-default-tab .dv-default-tab-content {
  flex-grow: 1;
  margin-right: 4px;
}
.dv-tab .dv-default-tab .dv-default-tab-action {
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.dv-tab .dv-default-tab .dv-default-tab-action:hover {
  border-radius: 2px;
  background-color: var(--dv-icon-hover-background-color);
}
@media (pointer: coarse) {
  .dv-tab .dv-default-tab .dv-default-tab-action {
    padding: 8px;
  }
}
.dv-tabs-overflow-dropdown-default {
  height: 100%;
  box-sizing: border-box;
  color: var(--dv-activegroup-hiddenpanel-tab-color);
  margin: var(--dv-tab-margin);
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}
.dv-tabs-overflow-dropdown-default > span {
  padding-left: 0.25rem;
}
.dv-tabs-overflow-dropdown-default > svg {
  transform: rotate(90deg);
}
.dv-tabs-overflow-dropdown-default:hover {
  border-radius: 2px;
  background-color: var(--dv-icon-hover-background-color);
}
.dv-tabs-container {
  display: flex;
  position: relative;
  height: 100%;
  overflow: auto;
  scrollbar-width: thin;
  /**
   * Multi-row (wrapping) tabs. Inert until the \`MultiRowTabsModule\` toggles
   * \`.dv-tabs-container--wrap\` on this element (\`overflow.mode: 'wrap'\`):
   * tabs wrap onto multiple rows instead of clipping into the dropdown, and
   * the strip grows to fit (the header grows via the \`:has()\` rule in
   * tabsContainer.scss; the free header-aware content-sizing seam then shrinks
   * the content area to match). Restricted to horizontal headers in v1.
   */
}
.dv-tabs-container.dv-tabs-container--wrap:not(.dv-tabs-container-vertical) {
  flex-wrap: wrap;
  height: auto;
  overflow: visible;
  align-content: flex-start;
}
.dv-tabs-container.dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: var(--dv-tabs-and-actions-container-height);
}
.dv-tabs-container.dv-tabs-container--wrap:not(.dv-tabs-container-vertical).dv-tabs-container--wrap-capped {
  max-height: calc(var(--dv-tabs-and-actions-container-height) * var(--dv-max-tab-rows));
  overflow: hidden;
}
.dv-tabs-container.dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab--reorder-before::after,
.dv-tabs-container.dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab--reorder-after::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  z-index: 10;
  pointer-events: none;
  background-color: var(--dv-drag-over-border-color);
}
.dv-tabs-container.dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab--reorder-before::after {
  left: 0;
}
.dv-tabs-container.dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab--reorder-after::after {
  right: 0;
}
.dv-tabs-container {
  /**
   * Multi-column (wrapping) tabs for a vertical (edge-group) header: the
   * mirror of the horizontal rule above with the axes swapped. The main axis
   * is vertical (bounded by the header height, so overflowing tabs wrap) and
   * the cross axis is horizontal (grows into additional columns). The header
   * grows in width via the \`:has()\` rule in tabsContainer.scss.
   *
   * Column flow direction under \`writing-mode: vertical-rl\` differs
   * between left and right header positions; this needs visual verification
   * in a real browser (jsdom lays out neither writing-mode nor flex-wrap).
   */
}
.dv-tabs-container.dv-tabs-container--wrap.dv-tabs-container-vertical {
  flex-wrap: wrap;
  width: auto;
  height: 100%;
  max-height: 100%;
  overflow: visible;
  align-content: flex-start;
}
.dv-tabs-container.dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: var(--dv-tabs-and-actions-container-height);
  height: var(--dv-wrap-vertical-tab-height, auto);
}
.dv-tabs-container.dv-tabs-container--wrap.dv-tabs-container-vertical.dv-tabs-container--wrap-capped {
  max-width: calc(var(--dv-tabs-and-actions-container-height) * var(--dv-max-tab-rows));
  overflow: hidden;
}
.dv-tabs-container.dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab--reorder-before::after,
.dv-tabs-container.dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab--reorder-after::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 10;
  pointer-events: none;
  background-color: var(--dv-drag-over-border-color);
}
.dv-tabs-container.dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab--reorder-before::after {
  top: 0;
}
.dv-tabs-container.dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab--reorder-after::after {
  bottom: 0;
}
.dv-tabs-container {
  /* GPU optimizations for smooth scrolling */
  will-change: scroll-position;
  transform: translate3d(0, 0, 0);
  /**
   * Stop scroll-chaining at the tab strip so that wheel / trackpad
   * overscroll past the strip's edges doesn't trigger the browser's
   * swipe-to-go-back-or-forward gesture (and doesn't scroll the page
   * either). \`contain\` keeps the native bounce visuals; \`none\` would
   * also disable them.
   */
  overscroll-behavior: contain;
  /**
   * Empty space between tabs (and the scrollbar lane) keeps pan-x so a
   * flick on those areas produces native momentum scroll. The tab and
   * chip elements themselves opt out (\`touch-action: none\`) so the
   * pointer drag source owns the gesture from pointerdown - a flick on
   * a tab or chip always becomes a drag, regardless of direction.
   */
  touch-action: pan-x;
}
.dv-tabs-container.dv-tabs-container-vertical {
  width: 100%;
  height: fit-content;
  max-height: 100%;
  writing-mode: vertical-rl;
  touch-action: pan-y;
}
.dv-tabs-container.dv-horizontal .dv-tab:not(:first-child)::before, .dv-tabs-container.dv-vertical .dv-tab:not(:first-child)::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  pointer-events: none;
  background-color: var(--dv-tab-divider-color);
}
.dv-tabs-container.dv-horizontal .dv-tab:not(:first-child)::before {
  width: 1px;
  height: 100%;
}
.dv-tabs-container.dv-vertical .dv-tab:not(:first-child)::before {
  width: 100%;
  height: 1px;
}
.dv-tabs-container::-webkit-scrollbar {
  height: 3px;
}
.dv-tabs-container {
  /* Track */
}
.dv-tabs-container::-webkit-scrollbar-track {
  background: transparent;
}
.dv-tabs-container {
  /* Handle */
}
.dv-tabs-container::-webkit-scrollbar-thumb {
  background: var(--dv-tabs-container-scrollbar-color);
}

.dv-scrollable > .dv-tabs-container {
  overflow: hidden;
}

.dv-tab {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  outline: none;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  font-size: var(--dv-tab-font-size);
  margin: var(--dv-tab-margin);
  touch-action: none;
}
.dv-tab.dv-tab--shifting {
  will-change: transform, margin-left, margin-right, margin-top, margin-bottom;
  transition: transform var(--dv-transition-duration, 200ms) ease-out, margin-left var(--dv-transition-duration, 200ms) ease-out, margin-right var(--dv-transition-duration, 200ms) ease-out, margin-top var(--dv-transition-duration, 200ms) ease-out, margin-bottom var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tab.dv-tab--dragging {
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transition: width var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tab.dv-tab--group-collapsed {
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transition: width var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tab.dv-tab--group-expanding {
  transition: width var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}

.dv-tab.dv-tab--pinned:has(.dv-tab-pin) {
  display: flex;
  align-items: center;
}
.dv-tab.dv-tab--pinned .dv-tab-pin {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 4px;
  opacity: 0.7;
  pointer-events: none;
}
.dv-tab.dv-tab--pinned .dv-tab-pin .dv-svg {
  width: 11px;
  height: 11px;
}
.dv-tab.dv-tab--pinned .dv-default-tab {
  min-width: 0;
}
.dv-tab.dv-tab--pinned .dv-default-tab-action {
  display: none;
}

.dv-tab.dv-tab--pinned-compact .dv-default-tab-content {
  display: none;
}
.dv-tab.dv-tab--pinned-compact .dv-tab-pin {
  margin-right: 0;
}

.dv-tabs-container:not(.dv-tabs-container--wrap):not(.dv-tabs-container-vertical) > .dv-tab.dv-tab--pinned-sticky {
  position: sticky;
  left: var(--dv-pinned-sticky-left, 0);
  z-index: 2;
}

.dv-tabs-and-actions-container.dv-tabs-and-actions-container--pinned-row {
  flex-wrap: wrap;
  height: auto;
  min-height: var(--dv-tabs-and-actions-container-height);
  align-content: flex-start;
}
.dv-tabs-and-actions-container.dv-tabs-and-actions-container--pinned-row .dv-pinned-row {
  flex: 0 0 100%;
  order: -1;
}
.dv-tabs-and-actions-container.dv-tabs-and-actions-container--pinned-row .dv-tab.dv-tab--pinned {
  display: none;
}

.dv-pinned-row {
  display: flex;
  align-items: center;
  gap: 2px;
  box-sizing: border-box;
  width: 100%;
  min-height: var(--dv-tabs-and-actions-container-height);
  padding: 2px 4px;
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom: 1px solid var(--dv-tab-divider-color);
}

.dv-pinned-tab {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  padding: 0.25rem 0.5rem;
  font-size: var(--dv-tab-font-size);
  cursor: pointer;
  user-select: none;
  background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}
.dv-pinned-tab.dv-pinned-tab--active {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-pinned-tab .dv-pinned-tab-label {
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dv-pinned-tab .dv-pinned-tab-unpin {
  flex-shrink: 0;
  opacity: 0.6;
}
.dv-pinned-tab .dv-pinned-tab-unpin:hover {
  opacity: 1;
}
.dv-pinned-tab.dv-pinned-tab--dragging {
  opacity: 0.5;
}
.dv-pinned-tab.dv-pinned-tab--drop-before, .dv-pinned-tab.dv-pinned-tab--drop-after {
  position: relative;
}
.dv-pinned-tab.dv-pinned-tab--drop-before::after, .dv-pinned-tab.dv-pinned-tab--drop-after::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  z-index: 10;
  pointer-events: none;
  background-color: var(--dv-drag-over-border-color);
}
.dv-pinned-tab.dv-pinned-tab--drop-before::after {
  left: 0;
}
.dv-pinned-tab.dv-pinned-tab--drop-after::after {
  right: 0;
}

@media (prefers-reduced-motion: reduce) {
  .dv-tab {
    transition: none !important;
  }
  .dv-tab-group-chip {
    transition: none !important;
  }
}
.dv-tab-group-chip {
  display: inline-flex;
  align-items: center;
  align-self: center;
  padding: var(--dv-tab-group-chip-padding);
  margin: 0 8px 0 8px;
  border-radius: var(--dv-tab-group-chip-border-radius);
  font-size: var(--dv-tab-group-chip-font-size);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  box-sizing: border-box;
  line-height: 1;
  touch-action: none;
  background-color: var(--dv-tab-group-color);
  color: white;
}
.dv-tab-group-chip.dv-tab-group-chip--accent-off {
  background-color: transparent;
  color: inherit;
}
.dv-tab-group-chip.dv-tab-group-chip--shifting {
  will-change: margin-left;
  transition: margin-left var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tab-group-chip.dv-tab-group-chip--dragging {
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transition: width var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tab-group-chip .dv-tab-group-chip-label--empty {
  display: none;
}
.dv-tab-group-chip:has(.dv-tab-group-chip-label--empty) {
  position: relative;
  width: 12px;
  height: 12px;
  padding: 0;
  border-radius: 50%;
}
.dv-tab-group-chip:has(.dv-tab-group-chip-label--empty)::before {
  content: "";
  position: absolute;
  inset: -8px;
}

.dv-tab-group-underline {
  position: absolute;
  bottom: 0;
  opacity: var(--dv-tab-group-line-opacity);
  pointer-events: none;
  z-index: 10;
}

.dv-tab-group-chip-continuation {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: var(--dv-tab-group-line-opacity);
  pointer-events: none;
  z-index: 10;
}

.dv-groupview-header-bottom .dv-tab-group-underline {
  bottom: auto;
  top: 0;
}

.dv-tabs-container-vertical .dv-tab-group-underline {
  bottom: auto;
  left: 0;
}

.dv-tabs-container-vertical .dv-tab-group-chip {
  margin: 8px 0 8px 0;
}
.dv-tabs-container-vertical .dv-tab {
  padding: 0.5rem 0.25rem;
}
.dv-tabs-container-vertical .dv-tab.dv-tab--group-collapsed {
  height: 0 !important;
  min-height: 0 !important;
  width: auto !important;
  min-width: initial !important;
  transition: height var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tabs-container-vertical .dv-tab.dv-tab--group-expanding {
  transition: height var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tabs-container-vertical .dv-tab.dv-tab--dragging {
  height: 0 !important;
  min-height: 0 !important;
  width: auto !important;
  min-width: initial !important;
  transition: height var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}

.dv-tabs-overflow-container {
  flex-direction: column;
  height: unset;
  font-size: var(--dv-tabs-and-actions-container-font-size);
  max-height: min(50vh, 400px);
  overflow-y: auto;
  border: 1px solid var(--dv-tab-divider-color);
  background-color: var(--dv-group-view-background-color);
  /* Scrollbar styling for webkit browsers */
}
.dv-tabs-overflow-container::-webkit-scrollbar {
  width: 6px;
}
.dv-tabs-overflow-container::-webkit-scrollbar-track {
  background: transparent;
}
.dv-tabs-overflow-container::-webkit-scrollbar-thumb {
  background: var(--dv-tabs-container-scrollbar-color);
  border-radius: 3px;
}
.dv-tabs-overflow-container {
  /* Firefox scrollbar */
  scrollbar-width: thin;
}
.dv-tabs-overflow-container .dv-tab:not(:last-child) {
  border-bottom: 1px solid var(--dv-tab-divider-color);
}
.dv-tabs-overflow-container .dv-active-tab {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-tabs-overflow-container .dv-inactive-tab {
  background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}
.dv-tabs-overflow-container .dv-tabs-overflow-group-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  font-size: 0.8em;
  font-weight: 600;
  color: var(--dv-activegroup-hiddenpanel-tab-color);
  cursor: pointer;
  border-bottom: 1px solid var(--dv-tab-divider-color);
}
.dv-tabs-overflow-container .dv-tabs-overflow-group-header:hover {
  background-color: var(--dv-icon-hover-background-color);
}
.dv-tabs-overflow-container .dv-tabs-overflow-group-color {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: var(--dv-tab-group-color);
}
.dv-tabs-overflow-container .dv-tabs-overflow-group-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dv-tabs-overflow-container .dv-tabs-overflow-group-collapsed-badge {
  font-size: 0.75em;
  font-weight: 400;
  opacity: 0.7;
  padding: 1px 4px;
  border-radius: 3px;
  background-color: var(--dv-tab-divider-color);
}
.dv-tabs-overflow-container .dv-tabs-overflow-pinned-header {
  cursor: default;
}
.dv-tabs-overflow-container .dv-tabs-overflow-pinned-header:hover {
  background-color: transparent;
}
.dv-tabs-overflow-container .dv-tabs-overflow-pinned-header .dv-tabs-overflow-pinned-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  opacity: 0.7;
}
.dv-tabs-overflow-container .dv-tabs-overflow-pinned-header .dv-tabs-overflow-pinned-icon .dv-svg {
  width: 11px;
  height: 11px;
}
.dv-tabs-overflow-container .dv-tab.dv-tab--grouped {
  padding-left: 16px;
}

/*
 * Advanced overflow popover (AdvancedOverflowModule): the same container as the
 * free list, upgraded in place with a search input, a scrollable listbox, and a
 * keyboard-highlighted active row. Styles live in core so the module ships no
 * CSS; they are inert unless the module renders this body.
 */
.dv-tabs-overflow-container.dv-tabs-overflow-advanced {
  min-width: 220px;
}
.dv-tabs-overflow-container.dv-tabs-overflow-advanced .dv-tabs-overflow-search {
  box-sizing: border-box;
  width: 100%;
  padding: 6px 8px;
  border: none;
  border-bottom: 1px solid var(--dv-tab-divider-color);
  outline: none;
  font-size: inherit;
  font-family: inherit;
  color: var(--dv-activegroup-visiblepanel-tab-color);
  background-color: var(--dv-group-view-background-color);
}
.dv-tabs-overflow-container.dv-tabs-overflow-advanced .dv-tabs-overflow-list {
  display: flex;
  flex-direction: column;
  outline: none;
}
.dv-tabs-overflow-container.dv-tabs-overflow-advanced .dv-tab.dv-tabs-overflow-option--focused {
  outline: 1px solid var(--dv-tab-divider-color);
  outline-offset: -1px;
  background-color: var(--dv-icon-hover-background-color);
}
.dv-tabs-and-actions-container {
  display: flex;
  background-color: var(--dv-tabs-and-actions-container-background-color);
  flex-shrink: 0;
  box-sizing: border-box;
  height: var(--dv-tabs-and-actions-container-height);
  font-size: var(--dv-tabs-and-actions-container-font-size);
  /**
   * Multi-row (wrapping) tabs: when the tab list wraps onto multiple rows
   * (\`.dv-tabs-container--wrap\`, toggled by the \`MultiRowTabsModule\`), the
   * header grows to fit instead of clipping. Inert otherwise: the single-row
   * fixed height above is unchanged.
   */
}
.dv-tabs-and-actions-container:has(.dv-tabs-container--wrap) {
  height: auto;
  min-height: var(--dv-tabs-and-actions-container-height);
  align-items: flex-start;
}
.dv-tabs-and-actions-container:has(.dv-tabs-container--wrap) > .dv-pre-actions-container,
.dv-tabs-and-actions-container:has(.dv-tabs-container--wrap) > .dv-left-actions-container,
.dv-tabs-and-actions-container:has(.dv-tabs-container--wrap) > .dv-right-actions-container,
.dv-tabs-and-actions-container:has(.dv-tabs-container--wrap) > .dv-void-container {
  height: var(--dv-tabs-and-actions-container-height);
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-scrollable {
  flex-grow: 1;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-tabs-container {
  flex-grow: 1;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-tabs-container .dv-tab {
  flex-grow: 1;
  padding: 0px;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-void-container {
  flex-grow: 0;
}
.dv-tabs-and-actions-container .dv-void-container {
  display: flex;
  flex-grow: 1;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: none;
}
.dv-tabs-and-actions-container .dv-void-container.dv-draggable {
  cursor: grab;
}
.dv-tabs-and-actions-container .dv-right-actions-container {
  display: flex;
}
.dv-tabs-and-actions-container .dv-right-actions-container.dv-right-actions-container-vertical {
  flex-direction: column;
}
.dv-tabs-and-actions-container.dv-groupview-header-vertical {
  flex-direction: column;
  height: auto;
  width: var(--dv-tabs-and-actions-container-height);
}
.dv-tabs-and-actions-container.dv-groupview-header-vertical:has(.dv-tabs-container--wrap) {
  width: auto;
  min-width: var(--dv-tabs-and-actions-container-height);
}
.dv-tabs-and-actions-container.dv-groupview-header-vertical:has(.dv-tabs-container--wrap) > .dv-scrollable {
  align-self: stretch;
}
.dv-watermark {
  display: flex;
  height: 100%;
}
.dv-dockview {
  position: relative;
  background-color: var(--dv-group-view-background-color);
}
.dv-dockview .dv-watermark-container {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: 1;
}
.dv-dockview .dv-overlay-render-container {
  position: relative;
}

.dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-inactive-tab {
  background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}
.dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  background-color: var(--dv-inactivegroup-visiblepanel-tab-background-color);
  color: var(--dv-inactivegroup-visiblepanel-tab-color);
}
.dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-inactive-tab {
  background-color: var(--dv-inactivegroup-hiddenpanel-tab-background-color);
  color: var(--dv-inactivegroup-hiddenpanel-tab-color);
}

/**
 * when a tab is dragged we lose the above stylings because they are conditional on parent elements
 * therefore we also set some stylings for the dragging event
 **/
.dv-tab.dv-tab-dragging {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}

.dv-keyboard-docking-hint {
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  z-index: 100;
  max-width: 90%;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  background-color: var(--dv-context-menu-background-color, var(--dv-group-view-background-color));
  color: var(--dv-activegroup-visiblepanel-tab-color);
  border: 1px solid var(--dv-tab-divider-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
}
.dv-groupview {
  display: flex;
  height: 100%;
  background-color: var(--dv-group-view-background-color);
  overflow: hidden;
  flex-direction: column;
}
.dv-groupview:focus {
  outline: none;
}
.dv-groupview > .dv-content-container {
  flex-grow: 1;
  min-height: 0;
  outline: none;
}
.dv-groupview.dv-groupview-header-bottom {
  flex-direction: column-reverse;
}
.dv-groupview.dv-groupview-header-left {
  flex-direction: row;
}
.dv-groupview.dv-groupview-header-right {
  flex-direction: row-reverse;
}
.dv-groupview.dv-groupview-edge.dv-edge-collapsed > .dv-content-container {
  display: none;
}
.dv-root-wrapper {
  height: 100%;
  width: 100%;
}
.dv-grid-view,
.dv-branch-node {
  height: 100%;
  width: 100%;
}
.dv-debug .dv-resize-container .dv-resize-handle-top {
  background-color: red;
}
.dv-debug .dv-resize-container .dv-resize-handle-bottom {
  background-color: green;
}
.dv-debug .dv-resize-container .dv-resize-handle-left {
  background-color: yellow;
}
.dv-debug .dv-resize-container .dv-resize-handle-right {
  background-color: blue;
}
.dv-debug .dv-resize-container .dv-resize-handle-topleft,
.dv-debug .dv-resize-container .dv-resize-handle-topright,
.dv-debug .dv-resize-container .dv-resize-handle-bottomleft,
.dv-debug .dv-resize-container .dv-resize-handle-bottomright {
  background-color: cyan;
}

.dv-floating-overlay-host {
  position: absolute;
  pointer-events: none;
}
.dv-floating-overlay-host > .dv-resize-container {
  pointer-events: auto;
}

.dv-edge-peek {
  background-color: var(--dv-group-view-background-color);
  border: 1px solid var(--dv-separator-border);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}
.dv-edge-peek > * {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.dv-auto-edge-band {
  position: absolute;
  pointer-events: none;
  z-index: var(--dv-overlay-z-index, 999);
  background-color: var(--dv-edge-dock-indicator-color);
  box-shadow: 0 0 6px var(--dv-edge-dock-indicator-color);
}

.dv-edge-peek-header {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 4px 0 8px;
  box-sizing: border-box;
  background-color: var(--dv-group-view-background-color);
  border: 1px solid var(--dv-separator-border);
  border-bottom: none;
  color: var(--dv-activegroup-visiblepanel-tab-color);
  font-size: 12px;
}
.dv-edge-peek-header .dv-edge-peek-pin,
.dv-edge-peek-header .dv-edge-peek-close {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
  border: none;
  padding: 4px;
  color: inherit;
  background: transparent;
  outline: none;
}
.dv-edge-peek-header .dv-edge-peek-pin:hover,
.dv-edge-peek-header .dv-edge-peek-close:hover {
  border-radius: 2px;
  background-color: var(--dv-icon-hover-background-color);
}
.dv-edge-peek-header .dv-edge-peek-pin:focus-visible,
.dv-edge-peek-header .dv-edge-peek-close:focus-visible {
  border-radius: 2px;
  outline: 1px solid var(--dv-tab-divider-color);
  outline-offset: -1px;
}

.dv-edge-peek-title {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dv-resize-container > .dv-grid-view {
  width: 100%;
  height: 100%;
}

.dv-resize-container-with-titlebar {
  display: flex;
  flex-direction: column;
}
.dv-resize-container-with-titlebar > .dv-floating-titlebar {
  flex: 0 0 auto;
}
.dv-resize-container-with-titlebar > .dv-grid-view {
  height: auto;
  flex: 1 1 0;
  min-height: 0;
}

.dv-floating-titlebar {
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--dv-floating-titlebar-height, 22px);
  background-color: var(--dv-floating-titlebar-background-color);
  border-bottom: var(--dv-floating-titlebar-border-bottom, none);
  user-select: none;
  touch-action: none;
}
.dv-floating-titlebar.dv-draggable {
  cursor: grab;
}

.dv-resize-container {
  --dv-overlay-z-index: var(--dv-overlay-z-index, 999);
  position: absolute;
  z-index: calc(var(--dv-overlay-z-index) - 2);
  background-color: var(--dv-group-view-background-color);
  border: var(--dv-floating-border);
  box-shadow: var(--dv-floating-box-shadow);
  /* GPU optimizations for floating group movement */
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
.dv-resize-container.dv-hidden {
  display: none;
}
.dv-resize-container.dv-resize-container-dragging {
  opacity: var(--dv-floating-group-dragging-opacity);
  /* Enhanced GPU acceleration during drag */
  will-change: transform, opacity;
}
.dv-resize-container .dv-resize-handle-top,
.dv-resize-container .dv-resize-handle-bottom,
.dv-resize-container .dv-resize-handle-left,
.dv-resize-container .dv-resize-handle-right,
.dv-resize-container .dv-resize-handle-topleft,
.dv-resize-container .dv-resize-handle-topright,
.dv-resize-container .dv-resize-handle-bottomleft,
.dv-resize-container .dv-resize-handle-bottomright {
  touch-action: none;
}
.dv-resize-container .dv-resize-handle-top {
  height: 4px;
  width: calc(100% - 8px);
  left: 4px;
  top: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ns-resize;
}
.dv-resize-container .dv-resize-handle-bottom {
  height: 4px;
  width: calc(100% - 8px);
  left: 4px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ns-resize;
}
.dv-resize-container .dv-resize-handle-left {
  height: calc(100% - 8px);
  width: 4px;
  left: -2px;
  top: 4px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ew-resize;
}
.dv-resize-container .dv-resize-handle-right {
  height: calc(100% - 8px);
  width: 4px;
  right: -2px;
  top: 4px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ew-resize;
}
.dv-resize-container .dv-resize-handle-topleft {
  height: 4px;
  width: 4px;
  top: -2px;
  left: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: nw-resize;
}
.dv-resize-container .dv-resize-handle-topright {
  height: 4px;
  width: 4px;
  right: -2px;
  top: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ne-resize;
}
.dv-resize-container .dv-resize-handle-bottomleft {
  height: 4px;
  width: 4px;
  left: -2px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: sw-resize;
}
.dv-resize-container .dv-resize-handle-bottomright {
  height: 4px;
  width: 4px;
  right: -2px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: se-resize;
}
@media (pointer: coarse) {
  .dv-resize-container .dv-resize-handle-top,
  .dv-resize-container .dv-resize-handle-bottom {
    height: 16px;
    width: calc(100% - 48px);
    left: 24px;
  }
  .dv-resize-container .dv-resize-handle-top {
    top: -10px;
  }
  .dv-resize-container .dv-resize-handle-bottom {
    bottom: -10px;
  }
  .dv-resize-container .dv-resize-handle-left,
  .dv-resize-container .dv-resize-handle-right {
    width: 16px;
    height: calc(100% - 48px);
    top: 24px;
  }
  .dv-resize-container .dv-resize-handle-left {
    left: -10px;
  }
  .dv-resize-container .dv-resize-handle-right {
    right: -10px;
  }
  .dv-resize-container .dv-resize-handle-topleft,
  .dv-resize-container .dv-resize-handle-topright,
  .dv-resize-container .dv-resize-handle-bottomleft,
  .dv-resize-container .dv-resize-handle-bottomright {
    height: 24px;
    width: 24px;
  }
  .dv-resize-container .dv-resize-handle-topleft {
    top: -12px;
    left: -12px;
  }
  .dv-resize-container .dv-resize-handle-topright {
    top: -12px;
    right: -12px;
  }
  .dv-resize-container .dv-resize-handle-bottomleft {
    bottom: -12px;
    left: -12px;
  }
  .dv-resize-container .dv-resize-handle-bottomright {
    bottom: -12px;
    right: -12px;
  }
}

.dv-smart-guides {
  pointer-events: none;
  z-index: calc(var(--dv-overlay-z-index, 999) + 100);
}

.dv-smart-guide {
  background-color: var(--dv-smart-guides-color, #1f9cf0);
}

.dv-smart-guide-preview {
  box-sizing: border-box;
  background-color: var(--dv-smart-guides-preview-color, rgba(31, 156, 240, 0.18));
  border: 1px solid var(--dv-smart-guides-color, #1f9cf0);
}
.dv-render-overlay {
  --dv-overlay-z-index: var(--dv-overlay-z-index, 999);
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  contain: layout paint;
  isolation: isolate;
  /* GPU optimizations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
.dv-render-overlay.dv-render-overlay-float {
  z-index: calc(var(--dv-overlay-z-index) - 1);
}

.dv-debug .dv-render-overlay {
  outline: 1px solid red;
  outline-offset: -1;
}
.dv-pane-container {
  height: 100%;
  width: 100%;
}
.dv-pane-container.dv-animated .dv-view {
  /* GPU optimizations for smooth pane animations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 0.15s ease-out;
}
.dv-pane-container .dv-view {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0px !important;
}
.dv-pane-container .dv-view:not(:first-child)::before {
  background-color: transparent !important;
}
.dv-pane-container .dv-view:not(:first-child) .dv-pane > .dv-pane-header {
  border-top: 1px solid var(--dv-paneview-header-border-color);
}
.dv-pane-container .dv-view .dv-default-header {
  background-color: var(--dv-group-view-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
  display: flex;
  padding: 0px 8px;
  cursor: pointer;
}
.dv-pane-container .dv-view .dv-default-header .dv-pane-header-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dv-pane-container .dv-view .dv-default-header > span {
  padding-left: 8px;
  flex-grow: 1;
}
.dv-pane-container:first-of-type > .dv-pane > .dv-pane-header {
  border-top: none !important;
}
.dv-pane-container .dv-pane {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}
.dv-pane-container .dv-pane .dv-pane-header {
  box-sizing: border-box;
  user-select: none;
  position: relative;
  outline: none;
}
.dv-pane-container .dv-pane .dv-pane-header.dv-pane-draggable {
  cursor: pointer;
}
.dv-pane-container .dv-pane .dv-pane-header:focus-visible:before, .dv-pane-container .dv-pane .dv-pane-header:has(:focus-visible):before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  content: "";
  pointer-events: none;
  outline: 1px solid;
  outline-width: -1px;
  outline-style: solid;
  outline-offset: -1px;
  outline-color: var(--dv-paneview-active-outline-color);
}
.dv-pane-container .dv-pane .dv-pane-body {
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;
  position: relative;
  outline: none;
}
.dv-pane-container .dv-pane .dv-pane-body:focus-visible:before, .dv-pane-container .dv-pane .dv-pane-body:has(:focus-visible):before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  content: "";
  pointer-events: none;
  outline: 1px solid;
  outline-width: -1px;
  outline-style: solid;
  outline-offset: -1px;
  outline-color: var(--dv-paneview-active-outline-color);
}
.dv-scrollable {
  position: relative;
  overflow: hidden;
}
.dv-scrollable .dv-scrollbar {
  position: absolute;
  border-radius: 2px;
  background-color: transparent;
  /* GPU optimizations */
  will-change: background-color, transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition-property: background-color;
  transition-timing-function: ease-in-out;
  transition-duration: 1s;
  transition-delay: 0s;
}
.dv-scrollable .dv-scrollbar-horizontal {
  bottom: 0px;
  left: 0px;
  height: 4px;
}
.dv-scrollable .dv-scrollbar-vertical {
  right: 0px;
  top: 0px;
  width: 4px;
}
.dv-scrollable:hover .dv-scrollbar, .dv-scrollable.dv-scrollable-resizing .dv-scrollbar, .dv-scrollable.dv-scrollable-scrolling .dv-scrollbar {
  background-color: var(--dv-scrollbar-background-color, rgba(255, 255, 255, 0.25));
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-enabled {
  background-color: black;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-disabled {
  background-color: orange;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-maximum {
  background-color: green;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-minimum {
  background-color: red;
}

.dv-split-view-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.dv-split-view-container.dv-splitview-disabled > .dv-sash-container > .dv-sash {
  pointer-events: none;
}
.dv-split-view-container.dv-animation .dv-view,
.dv-split-view-container.dv-animation .dv-sash {
  /* GPU optimizations for smooth animations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 0.15s ease-out;
}
.dv-split-view-container.dv-horizontal {
  height: 100%;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash {
  height: 100%;
  width: 4px;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-enabled {
  cursor: ew-resize;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-disabled {
  cursor: default;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-maximum {
  cursor: w-resize;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-minimum {
  cursor: e-resize;
}
.dv-split-view-container.dv-horizontal > .dv-view-container > .dv-view:not(:first-child)::before {
  height: 100%;
  width: 1px;
}
.dv-split-view-container.dv-vertical {
  width: 100%;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash {
  width: 100%;
  height: 4px;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-enabled {
  cursor: ns-resize;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-disabled {
  cursor: default;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-maximum {
  cursor: n-resize;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-minimum {
  cursor: s-resize;
}
.dv-split-view-container.dv-vertical > .dv-view-container > .dv-view {
  width: 100%;
}
.dv-split-view-container.dv-vertical > .dv-view-container > .dv-view:not(:first-child)::before {
  height: 1px;
  width: 100%;
}
.dv-split-view-container .dv-sash-container {
  height: 100%;
  width: 100%;
  position: absolute;
}
.dv-split-view-container .dv-sash-container .dv-sash {
  position: absolute;
  z-index: 99;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: none;
  background-color: var(--dv-sash-color, transparent);
}
.dv-split-view-container .dv-sash-container .dv-sash:not(.disabled):active, .dv-split-view-container .dv-sash-container .dv-sash:not(.disabled):hover {
  background-color: var(--dv-active-sash-color, transparent);
  transition-property: background-color;
  transition-timing-function: ease-in-out;
  transition-duration: var(--dv-active-sash-transition-duration, 0.1s);
  transition-delay: var(--dv-active-sash-transition-delay, 0.5s);
}
@media (pointer: coarse) {
  .dv-split-view-container .dv-sash-container > .dv-sash:not(.dv-disabled)::before {
    content: "";
    position: absolute;
    background: transparent;
  }
  .dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash:not(.dv-disabled)::before {
    top: 0;
    bottom: 0;
    left: -10px;
    right: -10px;
  }
  .dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash:not(.dv-disabled)::before {
    left: 0;
    right: 0;
    top: -10px;
    bottom: -10px;
  }
}
.dv-split-view-container .dv-view-container {
  position: relative;
  height: 100%;
  width: 100%;
}
.dv-split-view-container .dv-view-container .dv-view {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  position: absolute;
}
.dv-split-view-container.dv-separator-border .dv-view:not(:first-child)::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  pointer-events: none;
  background-color: var(--dv-separator-border);
}
.dv-svg {
  display: inline-block;
  fill: currentcolor;
  line-height: 1;
  stroke: currentcolor;
  stroke-width: 0;
}
.dockview-theme-dark {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-dark .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-dark {
  color-scheme: dark;
  --dv-group-view-background-color: #1e1e1e;
  --dv-tabs-and-actions-container-background-color: #252526;
  --dv-activegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-activegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-inactivegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-tab-divider-color: #1e1e1e;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: #969696;
  --dv-inactivegroup-visiblepanel-tab-color: #8f8f8f;
  --dv-inactivegroup-hiddenpanel-tab-color: #626262;
  --dv-separator-border: rgb(68, 68, 68);
  --dv-paneview-header-border-color: rgba(204, 204, 204, 0.2);
}

.dockview-theme-light {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-light .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-light {
  color-scheme: light;
  --dv-group-view-background-color: white;
  --dv-tabs-and-actions-container-background-color: #f3f3f3;
  --dv-activegroup-visiblepanel-tab-background-color: white;
  --dv-activegroup-hiddenpanel-tab-background-color: #ececec;
  --dv-inactivegroup-visiblepanel-tab-background-color: white;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #ececec;
  --dv-tab-divider-color: white;
  --dv-activegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-activegroup-hiddenpanel-tab-color: rgba(51, 51, 51, 0.7);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(51, 51, 51, 0.7);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(51, 51, 51, 0.35);
  --dv-separator-border: rgba(128, 128, 128, 0.35);
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-scrollbar-background-color: rgba(0, 0, 0, 0.25);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  --dv-floating-border: 1px solid rgba(0, 0, 0, 0.1);
}

.dockview-theme-vs {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-vs .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-vs {
  color-scheme: dark;
  --dv-group-view-background-color: #1e1e1e;
  --dv-tabs-and-actions-container-background-color: #252526;
  --dv-activegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-activegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-inactivegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-tab-divider-color: #1e1e1e;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: #969696;
  --dv-inactivegroup-visiblepanel-tab-color: #8f8f8f;
  --dv-inactivegroup-hiddenpanel-tab-color: #626262;
  --dv-separator-border: rgb(68, 68, 68);
  --dv-paneview-header-border-color: rgba(204, 204, 204, 0.2);
  --dv-tabs-and-actions-container-background-color: #2d2d30;
  --dv-tabs-and-actions-container-height: 20px;
  --dv-tabs-and-actions-container-font-size: 11px;
  --dv-activegroup-visiblepanel-tab-background-color: #007acc;
  --dv-inactivegroup-visiblepanel-tab-background-color: #3f3f46;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: white;
  --dv-inactivegroup-visiblepanel-tab-color: white;
  --dv-inactivegroup-hiddenpanel-tab-color: white;
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container {
  box-sizing: content-box;
  border-bottom: 2px solid var(--dv-activegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tab.dv-active-tab {
  border-top: 2px solid var(--dv-activegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tab.dv-inactive-tab {
  border-top: 2px solid var(--dv-activegroup-hiddenpanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container {
  box-sizing: content-box;
  border-bottom: 2px solid var(--dv-inactivegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tab.dv-active-tab {
  border-top: 2px solid var(--dv-inactivegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tab.dv-inactive-tab {
  border-top: 2px solid var(--dv-inactivegroup-hiddenpanel-tab-background-color);
}

.dockview-theme-abyss {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-abyss .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-abyss {
  color-scheme: dark;
  --dv-color-abyss-dark: #000c18;
  --dv-color-abyss: #10192c;
  --dv-color-abyss-light: #1c1c2a;
  --dv-color-abyss-lighter: #2b2b4a;
  --dv-color-abyss-accent: rgb(91, 30, 207);
  --dv-color-abyss-primary-text: white;
  --dv-color-abyss-secondary-text: rgb(148, 151, 169);
  --dv-group-view-background-color: var(--dv-color-abyss-dark);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-abyss-light
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-dark
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(--dv-color-abyss);
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-dark
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(--dv-color-abyss);
  --dv-tab-divider-color: var(--dv-color-abyss-lighter);
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: rgba(255, 255, 255, 0.5);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(255, 255, 255, 0.5);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(255, 255, 255, 0.25);
  --dv-separator-border: var(--dv-color-abyss-lighter);
  --dv-paneview-header-border-color: var(--dv-color-abyss-lighter);
  --dv-paneview-active-outline-color: #596f99;
}

.dockview-theme-dracula {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-dracula .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-dracula {
  color-scheme: dark;
  --dv-group-view-background-color: #282a36;
  --dv-tabs-and-actions-container-background-color: #191a21;
  --dv-activegroup-visiblepanel-tab-background-color: #282a36;
  --dv-activegroup-hiddenpanel-tab-background-color: #21222c;
  --dv-inactivegroup-visiblepanel-tab-background-color: #282a36;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #21222c;
  --dv-tab-divider-color: #191a21;
  --dv-activegroup-visiblepanel-tab-color: rgb(248, 248, 242);
  --dv-activegroup-hiddenpanel-tab-color: rgb(98, 114, 164);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(248, 248, 242, 0.5);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(98, 114, 164, 0.5);
  --dv-separator-border: #bd93f9;
  --dv-paneview-header-border-color: #bd93f9;
  --dv-paneview-active-outline-color: #6272a4;
}
.dockview-theme-dracula .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-dracula .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #94527e;
  z-index: 999;
}
.dockview-theme-dracula .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-dracula .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #5e3d5a;
  z-index: 999;
}

.dockview-theme-nord {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-nord .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-nord {
  color-scheme: dark;
  --dv-color-nord-polar-0: #2e3440;
  --dv-color-nord-polar-1: #3b4252;
  --dv-color-nord-polar-2: #434c5e;
  --dv-color-nord-polar-3: #4c566a;
  --dv-color-nord-frost: #88c0d0;
  --dv-color-nord-frost-2: #81a1c1;
  --dv-color-nord-snow-0: #eceff4;
  --dv-color-nord-snow-1: #d8dee9;
  --dv-group-view-background-color: var(--dv-color-nord-polar-0);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-nord-polar-1
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-nord-polar-0
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-nord-polar-2
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-nord-polar-1
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-nord-polar-2
  );
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-nord-snow-0);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-nord-snow-1);
  --dv-inactivegroup-visiblepanel-tab-color: #8a9bbf;
  --dv-inactivegroup-hiddenpanel-tab-color: #5e6f8e;
  --dv-separator-border: var(--dv-color-nord-polar-3);
  --dv-paneview-active-outline-color: var(--dv-color-nord-frost);
  --dv-active-sash-color: var(--dv-color-nord-frost);
  --dv-scrollbar-background-color: rgba(76, 86, 106, 0.5);
}
.dockview-theme-nord .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-nord .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 2px;
  background-color: var(--dv-color-nord-frost);
  z-index: 999;
}
.dockview-theme-nord .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-nord .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 2px;
  background-color: var(--dv-color-nord-frost-2);
  z-index: 999;
}

.dockview-theme-nord-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
  --dv-spacing-padding: 10px;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 12px;
  --dv-tab-margin-block: 0.5rem;
  --dv-tab-margin-inline: 0.25rem;
  --dv-tab-margin: var(--dv-tab-margin-block) var(--dv-tab-margin-inline);
  --dv-tabs-and-actions-container-height: 44px;
  --dv-tab-border-radius: 8px;
  --dv-sash-border-radius: 4px;
  --dv-dropdown-border-radius: 8px;
  --dv-tab-close-icon-size: 8px;
  --dv-floating-group-border: 2px solid var(--dv-group-view-background-color);
  --dv-floating-titlebar-background-color: var(
      --dv-group-view-background-color
  );
  --dv-floating-titlebar-border-bottom: none;
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
  background-color: var(--dv-group-view-background-color);
}
.dockview-theme-nord-spaced .dv-dockview {
  padding: 0;
}
.dockview-theme-nord-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-nord-spaced .dv-sash {
  border-radius: var(--dv-sash-border-radius);
}
.dockview-theme-nord-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-nord-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-nord-spaced .dv-resize-container .dv-groupview {
  border: var(--dv-floating-group-border);
}
.dockview-theme-nord-spaced .dv-resize-container > .dv-grid-view {
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
}
.dockview-theme-nord-spaced .dv-resize-container-with-titlebar > .dv-grid-view {
  padding-top: 0;
}
.dockview-theme-nord-spaced .dv-resize-container-with-titlebar > .dv-floating-titlebar {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-tabs-overflow-container,
.dockview-theme-nord-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: var(--dv-dropdown-border-radius);
  height: unset !important;
}
.dockview-theme-nord-spaced .dv-render-overlay {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-tab {
  border-radius: var(--dv-tab-border-radius);
}
.dockview-theme-nord-spaced .dv-tab .dv-svg {
  height: var(--dv-tab-close-icon-size);
  width: var(--dv-tab-close-icon-size);
}
.dockview-theme-nord-spaced .dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-nord-spaced .dv-tabs-container-vertical .dv-tab {
  margin: var(--dv-tab-margin-inline) var(--dv-tab-margin-block);
}
.dockview-theme-nord-spaced .dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-nord-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-groupview .dv-tabs-and-actions-container.dv-groupview-header-vertical {
  padding: calc(var(--dv-border-radius) / 2) 0;
}
.dockview-theme-nord-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-groupview.dv-edge-tool-window .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-groupview.dv-edge-tool-window .dv-content-container {
  border-radius: 0;
}
.dockview-theme-nord-spaced .dv-groupview.dv-edge-tool-window .dv-tabs-and-actions-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-edge-peek {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-edge-peek-clip {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced {
  color-scheme: dark;
  --dv-color-nord-polar-0: #2e3440;
  --dv-color-nord-polar-1: #3b4252;
  --dv-color-nord-polar-2: #434c5e;
  --dv-color-nord-polar-3: #4c566a;
  --dv-color-nord-frost: #88c0d0;
  --dv-color-nord-frost-2: #81a1c1;
  --dv-color-nord-snow-0: #eceff4;
  --dv-color-nord-snow-1: #d8dee9;
  --dv-group-view-background-color: var(--dv-color-nord-polar-0);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-nord-polar-1
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-nord-polar-2
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-nord-polar-1
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-nord-polar-2
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-nord-polar-1
  );
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-nord-snow-0);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-nord-snow-1);
  --dv-inactivegroup-visiblepanel-tab-color: #8a9bbf;
  --dv-inactivegroup-hiddenpanel-tab-color: #5e6f8e;
  --dv-separator-border: transparent;
  --dv-paneview-active-outline-color: var(--dv-color-nord-frost);
  --dv-active-sash-color: var(--dv-color-nord-frost);
  --dv-scrollbar-background-color: rgba(76, 86, 106, 0.5);
  --dv-floating-group-border: 2px solid var(--dv-color-nord-polar-0);
}

.dockview-theme-catppuccin-mocha {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-catppuccin-mocha .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-catppuccin-mocha {
  color-scheme: dark;
  --dv-color-mocha-crust: #11111b;
  --dv-color-mocha-mantle: #181825;
  --dv-color-mocha-base: #1e1e2e;
  --dv-color-mocha-surface0: #313244;
  --dv-color-mocha-surface1: #45475a;
  --dv-color-mocha-text: #cdd6f4;
  --dv-color-mocha-subtext1: #bac2de;
  --dv-color-mocha-subtext0: #a6adc8;
  --dv-color-mocha-mauve: #cba6f7;
  --dv-color-mocha-lavender: #b4befe;
  --dv-group-view-background-color: var(--dv-color-mocha-base);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-mocha-mantle
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-mocha-base
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-mocha-surface0
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-mocha-mantle
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-mocha-crust
  );
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-mocha-text);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-mocha-subtext1);
  --dv-inactivegroup-visiblepanel-tab-color: var(--dv-color-mocha-subtext0);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(166, 173, 200, 0.5);
  --dv-separator-border: var(--dv-color-mocha-surface1);
  --dv-paneview-active-outline-color: var(--dv-color-mocha-mauve);
  --dv-active-sash-color: var(--dv-color-mocha-mauve);
  --dv-scrollbar-background-color: rgba(49, 50, 68, 0.8);
}
.dockview-theme-catppuccin-mocha .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-catppuccin-mocha .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 2px;
  background-color: var(--dv-color-mocha-mauve);
  z-index: 999;
}
.dockview-theme-catppuccin-mocha .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-catppuccin-mocha .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 2px;
  background-color: rgba(180, 190, 254, 0.4);
  z-index: 999;
}

.dockview-theme-catppuccin-mocha-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
  --dv-spacing-padding: 10px;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 12px;
  --dv-tab-margin-block: 0.5rem;
  --dv-tab-margin-inline: 0.25rem;
  --dv-tab-margin: var(--dv-tab-margin-block) var(--dv-tab-margin-inline);
  --dv-tabs-and-actions-container-height: 44px;
  --dv-tab-border-radius: 8px;
  --dv-sash-border-radius: 4px;
  --dv-dropdown-border-radius: 8px;
  --dv-tab-close-icon-size: 8px;
  --dv-floating-group-border: 2px solid var(--dv-group-view-background-color);
  --dv-floating-titlebar-background-color: var(
      --dv-group-view-background-color
  );
  --dv-floating-titlebar-border-bottom: none;
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
  background-color: var(--dv-group-view-background-color);
}
.dockview-theme-catppuccin-mocha-spaced .dv-dockview {
  padding: 0;
}
.dockview-theme-catppuccin-mocha-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-catppuccin-mocha-spaced .dv-sash {
  border-radius: var(--dv-sash-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-catppuccin-mocha-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-catppuccin-mocha-spaced .dv-resize-container .dv-groupview {
  border: var(--dv-floating-group-border);
}
.dockview-theme-catppuccin-mocha-spaced .dv-resize-container > .dv-grid-view {
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
}
.dockview-theme-catppuccin-mocha-spaced .dv-resize-container-with-titlebar > .dv-grid-view {
  padding-top: 0;
}
.dockview-theme-catppuccin-mocha-spaced .dv-resize-container-with-titlebar > .dv-floating-titlebar {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-tabs-overflow-container,
.dockview-theme-catppuccin-mocha-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: var(--dv-dropdown-border-radius);
  height: unset !important;
}
.dockview-theme-catppuccin-mocha-spaced .dv-render-overlay {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-tab {
  border-radius: var(--dv-tab-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-tab .dv-svg {
  height: var(--dv-tab-close-icon-size);
  width: var(--dv-tab-close-icon-size);
}
.dockview-theme-catppuccin-mocha-spaced .dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-catppuccin-mocha-spaced .dv-tabs-container-vertical .dv-tab {
  margin: var(--dv-tab-margin-inline) var(--dv-tab-margin-block);
}
.dockview-theme-catppuccin-mocha-spaced .dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview .dv-tabs-and-actions-container.dv-groupview-header-vertical {
  padding: calc(var(--dv-border-radius) / 2) 0;
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview.dv-edge-tool-window .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview.dv-edge-tool-window .dv-content-container {
  border-radius: 0;
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview.dv-edge-tool-window .dv-tabs-and-actions-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-edge-peek {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-edge-peek-clip {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced {
  color-scheme: dark;
  --dv-color-mocha-crust: #11111b;
  --dv-color-mocha-mantle: #181825;
  --dv-color-mocha-base: #1e1e2e;
  --dv-color-mocha-surface0: #313244;
  --dv-color-mocha-surface1: #45475a;
  --dv-color-mocha-text: #cdd6f4;
  --dv-color-mocha-subtext1: #bac2de;
  --dv-color-mocha-subtext0: #a6adc8;
  --dv-color-mocha-mauve: #cba6f7;
  --dv-color-mocha-lavender: #b4befe;
  --dv-group-view-background-color: var(--dv-color-mocha-crust);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-mocha-mantle
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-mocha-surface0
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-mocha-mantle
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-mocha-surface0
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-mocha-mantle
  );
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-mocha-text);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-mocha-subtext1);
  --dv-inactivegroup-visiblepanel-tab-color: var(--dv-color-mocha-subtext0);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(166, 173, 200, 0.5);
  --dv-separator-border: transparent;
  --dv-paneview-active-outline-color: var(--dv-color-mocha-mauve);
  --dv-active-sash-color: var(--dv-color-mocha-mauve);
  --dv-scrollbar-background-color: rgba(49, 50, 68, 0.8);
  --dv-floating-group-border: 2px solid var(--dv-color-mocha-crust);
}

.dockview-theme-monokai {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-monokai .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-monokai {
  color-scheme: dark;
  --dv-color-monokai-bg: #272822;
  --dv-color-monokai-bg-light: #3e3d32;
  --dv-color-monokai-comment: #75715e;
  --dv-color-monokai-fg: #f8f8f2;
  --dv-color-monokai-green: #a6e22e;
  --dv-group-view-background-color: var(--dv-color-monokai-bg);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-monokai-bg-light
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-monokai-bg
  );
  --dv-activegroup-hiddenpanel-tab-background-color: #2d2c25;
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-monokai-bg
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2c25;
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-monokai-fg);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-monokai-comment);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(248, 248, 242, 0.5);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(117, 113, 94, 0.5);
  --dv-separator-border: var(--dv-color-monokai-bg-light);
  --dv-paneview-active-outline-color: var(--dv-color-monokai-green);
  --dv-active-sash-color: var(--dv-color-monokai-green);
  --dv-scrollbar-background-color: rgba(117, 113, 94, 0.5);
}
.dockview-theme-monokai .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-monokai .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 2px;
  background-color: var(--dv-color-monokai-green);
  z-index: 999;
}
.dockview-theme-monokai .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-monokai .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 2px;
  background-color: rgba(166, 226, 46, 0.35);
  z-index: 999;
}

.dockview-theme-solarized-light {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-solarized-light .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-solarized-light {
  color-scheme: light;
  --dv-color-sol-base3: #fdf6e3;
  --dv-color-sol-base2: #eee8d5;
  --dv-color-sol-base1: #93a1a1;
  --dv-color-sol-base00: #657b83;
  --dv-color-sol-base01: #586e75;
  --dv-color-sol-blue: #268bd2;
  --dv-group-view-background-color: var(--dv-color-sol-base3);
  --dv-tabs-and-actions-container-background-color: var(--dv-color-sol-base2);
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-sol-base3
  );
  --dv-activegroup-hiddenpanel-tab-background-color: #e8e2d0;
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-sol-base3
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: #e8e2d0;
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-sol-base01);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-sol-base00);
  --dv-inactivegroup-visiblepanel-tab-color: var(--dv-color-sol-base1);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(147, 161, 161, 0.6);
  --dv-separator-border: var(--dv-color-sol-base2);
  --dv-paneview-active-outline-color: var(--dv-color-sol-blue);
  --dv-active-sash-color: var(--dv-color-sol-blue);
  --dv-scrollbar-background-color: rgba(101, 123, 131, 0.25);
  --dv-drag-over-background-color: rgba(38, 139, 210, 0.15);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  --dv-floating-border: 1px solid rgba(0, 0, 0, 0.1);
}

.dockview-theme-solarized-light-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
  --dv-spacing-padding: 10px;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 12px;
  --dv-tab-margin-block: 0.5rem;
  --dv-tab-margin-inline: 0.25rem;
  --dv-tab-margin: var(--dv-tab-margin-block) var(--dv-tab-margin-inline);
  --dv-tabs-and-actions-container-height: 44px;
  --dv-tab-border-radius: 8px;
  --dv-sash-border-radius: 4px;
  --dv-dropdown-border-radius: 8px;
  --dv-tab-close-icon-size: 8px;
  --dv-floating-group-border: 2px solid var(--dv-group-view-background-color);
  --dv-floating-titlebar-background-color: var(
      --dv-group-view-background-color
  );
  --dv-floating-titlebar-border-bottom: none;
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
  background-color: var(--dv-group-view-background-color);
}
.dockview-theme-solarized-light-spaced .dv-dockview {
  padding: 0;
}
.dockview-theme-solarized-light-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-solarized-light-spaced .dv-sash {
  border-radius: var(--dv-sash-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-solarized-light-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-solarized-light-spaced .dv-resize-container .dv-groupview {
  border: var(--dv-floating-group-border);
}
.dockview-theme-solarized-light-spaced .dv-resize-container > .dv-grid-view {
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
}
.dockview-theme-solarized-light-spaced .dv-resize-container-with-titlebar > .dv-grid-view {
  padding-top: 0;
}
.dockview-theme-solarized-light-spaced .dv-resize-container-with-titlebar > .dv-floating-titlebar {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-tabs-overflow-container,
.dockview-theme-solarized-light-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: var(--dv-dropdown-border-radius);
  height: unset !important;
}
.dockview-theme-solarized-light-spaced .dv-render-overlay {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-tab {
  border-radius: var(--dv-tab-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-tab .dv-svg {
  height: var(--dv-tab-close-icon-size);
  width: var(--dv-tab-close-icon-size);
}
.dockview-theme-solarized-light-spaced .dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-solarized-light-spaced .dv-tabs-container-vertical .dv-tab {
  margin: var(--dv-tab-margin-inline) var(--dv-tab-margin-block);
}
.dockview-theme-solarized-light-spaced .dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-solarized-light-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-groupview .dv-tabs-and-actions-container.dv-groupview-header-vertical {
  padding: calc(var(--dv-border-radius) / 2) 0;
}
.dockview-theme-solarized-light-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-groupview.dv-edge-tool-window .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-groupview.dv-edge-tool-window .dv-content-container {
  border-radius: 0;
}
.dockview-theme-solarized-light-spaced .dv-groupview.dv-edge-tool-window .dv-tabs-and-actions-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-edge-peek {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-edge-peek-clip {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced {
  color-scheme: light;
  --dv-color-sol-base3: #fdf6e3;
  --dv-color-sol-base2: #eee8d5;
  --dv-color-sol-base1: #93a1a1;
  --dv-color-sol-base00: #657b83;
  --dv-color-sol-base01: #586e75;
  --dv-color-sol-blue: #268bd2;
  --dv-drag-over-background-color: rgba(38, 139, 210, 0.1);
  --dv-group-view-background-color: var(--dv-color-sol-base2);
  --dv-tabs-and-actions-container-background-color: var(--dv-color-sol-base3);
  --dv-activegroup-visiblepanel-tab-background-color: #e8e2d0;
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-sol-base3
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: #e8e2d0;
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-sol-base3
  );
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-sol-base01);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-sol-base00);
  --dv-inactivegroup-visiblepanel-tab-color: var(--dv-color-sol-base1);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(147, 161, 161, 0.6);
  --dv-separator-border: transparent;
  --dv-paneview-active-outline-color: var(--dv-color-sol-blue);
  --dv-active-sash-color: var(--dv-color-sol-blue);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  --dv-floating-border: 1px solid rgba(0, 0, 0, 0.1);
  --dv-scrollbar-background-color: rgba(101, 123, 131, 0.25);
  --dv-floating-group-border: 2px solid rgba(238, 232, 213, 0.5);
}

.dockview-theme-github-dark {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-github-dark .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-github-dark {
  color-scheme: dark;
  --dv-color-gh-canvas-default: #0d1117;
  --dv-color-gh-canvas-subtle: #161b22;
  --dv-color-gh-canvas-inset: #010409;
  --dv-color-gh-border: #30363d;
  --dv-color-gh-border-muted: #21262d;
  --dv-color-gh-fg-default: #e6edf3;
  --dv-color-gh-fg-muted: #8b949e;
  --dv-color-gh-fg-subtle: #6e7681;
  --dv-color-gh-accent: #58a6ff;
  --dv-group-view-background-color: var(--dv-color-gh-canvas-default);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-gh-canvas-subtle
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-gh-canvas-default
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-gh-canvas-subtle
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-gh-canvas-default
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-gh-canvas-subtle
  );
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-gh-fg-default);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-gh-fg-muted);
  --dv-inactivegroup-visiblepanel-tab-color: var(--dv-color-gh-fg-subtle);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(110, 118, 129, 0.5);
  --dv-separator-border: var(--dv-color-gh-border);
  --dv-paneview-active-outline-color: var(--dv-color-gh-accent);
  --dv-active-sash-color: var(--dv-color-gh-accent);
  --dv-scrollbar-background-color: rgba(48, 54, 61, 0.7);
  --dv-drag-over-background-color: rgba(88, 166, 255, 0.15);
}

.dockview-theme-github-dark-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
  --dv-spacing-padding: 10px;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 12px;
  --dv-tab-margin-block: 0.5rem;
  --dv-tab-margin-inline: 0.25rem;
  --dv-tab-margin: var(--dv-tab-margin-block) var(--dv-tab-margin-inline);
  --dv-tabs-and-actions-container-height: 44px;
  --dv-tab-border-radius: 8px;
  --dv-sash-border-radius: 4px;
  --dv-dropdown-border-radius: 8px;
  --dv-tab-close-icon-size: 8px;
  --dv-floating-group-border: 2px solid var(--dv-group-view-background-color);
  --dv-floating-titlebar-background-color: var(
      --dv-group-view-background-color
  );
  --dv-floating-titlebar-border-bottom: none;
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
  background-color: var(--dv-group-view-background-color);
}
.dockview-theme-github-dark-spaced .dv-dockview {
  padding: 0;
}
.dockview-theme-github-dark-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-github-dark-spaced .dv-sash {
  border-radius: var(--dv-sash-border-radius);
}
.dockview-theme-github-dark-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-github-dark-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-github-dark-spaced .dv-resize-container .dv-groupview {
  border: var(--dv-floating-group-border);
}
.dockview-theme-github-dark-spaced .dv-resize-container > .dv-grid-view {
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
}
.dockview-theme-github-dark-spaced .dv-resize-container-with-titlebar > .dv-grid-view {
  padding-top: 0;
}
.dockview-theme-github-dark-spaced .dv-resize-container-with-titlebar > .dv-floating-titlebar {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-tabs-overflow-container,
.dockview-theme-github-dark-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: var(--dv-dropdown-border-radius);
  height: unset !important;
}
.dockview-theme-github-dark-spaced .dv-render-overlay {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-tab {
  border-radius: var(--dv-tab-border-radius);
}
.dockview-theme-github-dark-spaced .dv-tab .dv-svg {
  height: var(--dv-tab-close-icon-size);
  width: var(--dv-tab-close-icon-size);
}
.dockview-theme-github-dark-spaced .dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-github-dark-spaced .dv-tabs-container-vertical .dv-tab {
  margin: var(--dv-tab-margin-inline) var(--dv-tab-margin-block);
}
.dockview-theme-github-dark-spaced .dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-github-dark-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-groupview .dv-tabs-and-actions-container.dv-groupview-header-vertical {
  padding: calc(var(--dv-border-radius) / 2) 0;
}
.dockview-theme-github-dark-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-groupview.dv-edge-tool-window .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-groupview.dv-edge-tool-window .dv-content-container {
  border-radius: 0;
}
.dockview-theme-github-dark-spaced .dv-groupview.dv-edge-tool-window .dv-tabs-and-actions-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-edge-peek {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-edge-peek-clip {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced {
  color-scheme: dark;
  --dv-color-gh-canvas-default: #0d1117;
  --dv-color-gh-canvas-subtle: #161b22;
  --dv-color-gh-canvas-inset: #010409;
  --dv-color-gh-border: #30363d;
  --dv-color-gh-border-muted: #21262d;
  --dv-color-gh-fg-default: #e6edf3;
  --dv-color-gh-fg-muted: #8b949e;
  --dv-color-gh-fg-subtle: #6e7681;
  --dv-color-gh-accent: #58a6ff;
  --dv-drag-over-background-color: rgba(88, 166, 255, 0.1);
  --dv-group-view-background-color: var(--dv-color-gh-canvas-inset);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-gh-canvas-subtle
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-gh-border
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-gh-canvas-subtle
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-gh-border
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-gh-canvas-subtle
  );
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-gh-fg-default);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-gh-fg-muted);
  --dv-inactivegroup-visiblepanel-tab-color: var(--dv-color-gh-fg-subtle);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(110, 118, 129, 0.5);
  --dv-separator-border: transparent;
  --dv-paneview-active-outline-color: var(--dv-color-gh-accent);
  --dv-active-sash-color: var(--dv-color-gh-accent);
  --dv-scrollbar-background-color: rgba(48, 54, 61, 0.7);
  --dv-floating-group-border: 2px solid var(--dv-color-gh-canvas-inset);
}

.dockview-theme-github-light {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-github-light .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-github-light {
  color-scheme: light;
  --dv-color-gh-light-canvas-default: #ffffff;
  --dv-color-gh-light-canvas-subtle: #f6f8fa;
  --dv-color-gh-light-canvas-inset: #f0f6ff;
  --dv-color-gh-light-border: #d0d7de;
  --dv-color-gh-light-fg-default: #1f2328;
  --dv-color-gh-light-fg-muted: #656d76;
  --dv-color-gh-light-fg-subtle: #6e7781;
  --dv-color-gh-light-accent: #0969da;
  --dv-group-view-background-color: var(--dv-color-gh-light-canvas-default);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-gh-light-canvas-subtle
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-gh-light-canvas-default
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-gh-light-canvas-subtle
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-gh-light-canvas-default
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-gh-light-canvas-subtle
  );
  --dv-activegroup-visiblepanel-tab-color: var(
      --dv-color-gh-light-fg-default
  );
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-gh-light-fg-muted);
  --dv-inactivegroup-visiblepanel-tab-color: var(
      --dv-color-gh-light-fg-subtle
  );
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(110, 118, 129, 0.4);
  --dv-separator-border: var(--dv-color-gh-light-border);
  --dv-paneview-active-outline-color: var(--dv-color-gh-light-accent);
  --dv-active-sash-color: var(--dv-color-gh-light-accent);
  --dv-scrollbar-background-color: rgba(208, 215, 222, 0.5);
  --dv-drag-over-background-color: rgba(9, 105, 218, 0.1);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  --dv-floating-border: 1px solid rgba(0, 0, 0, 0.1);
}

.dockview-theme-github-light-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
  --dv-spacing-padding: 10px;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 12px;
  --dv-tab-margin-block: 0.5rem;
  --dv-tab-margin-inline: 0.25rem;
  --dv-tab-margin: var(--dv-tab-margin-block) var(--dv-tab-margin-inline);
  --dv-tabs-and-actions-container-height: 44px;
  --dv-tab-border-radius: 8px;
  --dv-sash-border-radius: 4px;
  --dv-dropdown-border-radius: 8px;
  --dv-tab-close-icon-size: 8px;
  --dv-floating-group-border: 2px solid var(--dv-group-view-background-color);
  --dv-floating-titlebar-background-color: var(
      --dv-group-view-background-color
  );
  --dv-floating-titlebar-border-bottom: none;
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
  background-color: var(--dv-group-view-background-color);
}
.dockview-theme-github-light-spaced .dv-dockview {
  padding: 0;
}
.dockview-theme-github-light-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-github-light-spaced .dv-sash {
  border-radius: var(--dv-sash-border-radius);
}
.dockview-theme-github-light-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-github-light-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-github-light-spaced .dv-resize-container .dv-groupview {
  border: var(--dv-floating-group-border);
}
.dockview-theme-github-light-spaced .dv-resize-container > .dv-grid-view {
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
}
.dockview-theme-github-light-spaced .dv-resize-container-with-titlebar > .dv-grid-view {
  padding-top: 0;
}
.dockview-theme-github-light-spaced .dv-resize-container-with-titlebar > .dv-floating-titlebar {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-tabs-overflow-container,
.dockview-theme-github-light-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: var(--dv-dropdown-border-radius);
  height: unset !important;
}
.dockview-theme-github-light-spaced .dv-render-overlay {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-tab {
  border-radius: var(--dv-tab-border-radius);
}
.dockview-theme-github-light-spaced .dv-tab .dv-svg {
  height: var(--dv-tab-close-icon-size);
  width: var(--dv-tab-close-icon-size);
}
.dockview-theme-github-light-spaced .dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-github-light-spaced .dv-tabs-container-vertical .dv-tab {
  margin: var(--dv-tab-margin-inline) var(--dv-tab-margin-block);
}
.dockview-theme-github-light-spaced .dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-github-light-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-groupview .dv-tabs-and-actions-container.dv-groupview-header-vertical {
  padding: calc(var(--dv-border-radius) / 2) 0;
}
.dockview-theme-github-light-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-groupview.dv-edge-tool-window .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-groupview.dv-edge-tool-window .dv-content-container {
  border-radius: 0;
}
.dockview-theme-github-light-spaced .dv-groupview.dv-edge-tool-window .dv-tabs-and-actions-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-edge-peek {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-edge-peek-clip {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced {
  color-scheme: light;
  --dv-color-gh-light-canvas-default: #ffffff;
  --dv-color-gh-light-canvas-subtle: #f6f8fa;
  --dv-color-gh-light-border: #d0d7de;
  --dv-color-gh-light-fg-default: #1f2328;
  --dv-color-gh-light-fg-muted: #656d76;
  --dv-color-gh-light-fg-subtle: #6e7781;
  --dv-color-gh-light-accent: #0969da;
  --dv-drag-over-background-color: rgba(9, 105, 218, 0.08);
  --dv-group-view-background-color: var(--dv-color-gh-light-canvas-subtle);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-gh-light-canvas-default
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-gh-light-border
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-gh-light-canvas-default
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-gh-light-border
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-gh-light-canvas-default
  );
  --dv-activegroup-visiblepanel-tab-color: var(
      --dv-color-gh-light-fg-default
  );
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-gh-light-fg-muted);
  --dv-inactivegroup-visiblepanel-tab-color: var(
      --dv-color-gh-light-fg-subtle
  );
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(110, 118, 129, 0.4);
  --dv-separator-border: transparent;
  --dv-paneview-active-outline-color: var(--dv-color-gh-light-accent);
  --dv-active-sash-color: var(--dv-color-gh-light-accent);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  --dv-floating-border: 1px solid rgba(0, 0, 0, 0.1);
  --dv-scrollbar-background-color: rgba(208, 215, 222, 0.5);
  --dv-floating-group-border: 2px solid rgba(208, 215, 222, 0.5);
}

.dockview-theme-abyss-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
  --dv-spacing-padding: 10px;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 12px;
  --dv-tab-margin-block: 0.5rem;
  --dv-tab-margin-inline: 0.25rem;
  --dv-tab-margin: var(--dv-tab-margin-block) var(--dv-tab-margin-inline);
  --dv-tabs-and-actions-container-height: 44px;
  --dv-tab-border-radius: 8px;
  --dv-sash-border-radius: 4px;
  --dv-dropdown-border-radius: 8px;
  --dv-tab-close-icon-size: 8px;
  --dv-floating-group-border: 2px solid var(--dv-group-view-background-color);
  --dv-floating-titlebar-background-color: var(
      --dv-group-view-background-color
  );
  --dv-floating-titlebar-border-bottom: none;
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
  background-color: var(--dv-group-view-background-color);
}
.dockview-theme-abyss-spaced .dv-dockview {
  padding: 0;
}
.dockview-theme-abyss-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-abyss-spaced .dv-sash {
  border-radius: var(--dv-sash-border-radius);
}
.dockview-theme-abyss-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-abyss-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-abyss-spaced .dv-resize-container .dv-groupview {
  border: var(--dv-floating-group-border);
}
.dockview-theme-abyss-spaced .dv-resize-container > .dv-grid-view {
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
}
.dockview-theme-abyss-spaced .dv-resize-container-with-titlebar > .dv-grid-view {
  padding-top: 0;
}
.dockview-theme-abyss-spaced .dv-resize-container-with-titlebar > .dv-floating-titlebar {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-tabs-overflow-container,
.dockview-theme-abyss-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: var(--dv-dropdown-border-radius);
  height: unset !important;
}
.dockview-theme-abyss-spaced .dv-render-overlay {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-tab {
  border-radius: var(--dv-tab-border-radius);
}
.dockview-theme-abyss-spaced .dv-tab .dv-svg {
  height: var(--dv-tab-close-icon-size);
  width: var(--dv-tab-close-icon-size);
}
.dockview-theme-abyss-spaced .dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-abyss-spaced .dv-tabs-container-vertical .dv-tab {
  margin: var(--dv-tab-margin-inline) var(--dv-tab-margin-block);
}
.dockview-theme-abyss-spaced .dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-abyss-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-groupview .dv-tabs-and-actions-container.dv-groupview-header-vertical {
  padding: calc(var(--dv-border-radius) / 2) 0;
}
.dockview-theme-abyss-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-groupview.dv-edge-tool-window .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-groupview.dv-edge-tool-window .dv-content-container {
  border-radius: 0;
}
.dockview-theme-abyss-spaced .dv-groupview.dv-edge-tool-window .dv-tabs-and-actions-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-edge-peek {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-edge-peek-clip {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced {
  color-scheme: dark;
  --dv-color-abyss-dark: rgb(11, 6, 17);
  --dv-color-abyss: #16121f;
  --dv-color-abyss-light: #201d2b;
  --dv-color-abyss-lighter: #2a2837;
  --dv-color-abyss-accent: rgb(91, 30, 207);
  --dv-color-abyss-primary-text: white;
  --dv-color-abyss-secondary-text: rgb(148, 151, 169);
  --dv-drag-over-background-color: '';
  --dv-group-view-background-color: var(--dv-color-abyss-dark);
  --dv-tabs-and-actions-container-background-color: var(--dv-color-abyss);
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-lighter
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-abyss-light
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-lighter
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-abyss-light
  );
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-abyss-primary-text);
  --dv-activegroup-hiddenpanel-tab-color: var(
      --dv-color-abyss-secondary-text
  );
  --dv-inactivegroup-visiblepanel-tab-color: var(
      --dv-color-abyss-primary-text
  );
  --dv-inactivegroup-hiddenpanel-tab-color: var(
      --dv-color-abyss-secondary-text
  );
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-active-sash-color: var(--dv-color-abyss-accent);
  --dv-floating-group-border: 2px solid var(--dv-color-abyss-dark);
}

.dockview-theme-light-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
  --dv-spacing-padding: 10px;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 12px;
  --dv-tab-margin-block: 0.5rem;
  --dv-tab-margin-inline: 0.25rem;
  --dv-tab-margin: var(--dv-tab-margin-block) var(--dv-tab-margin-inline);
  --dv-tabs-and-actions-container-height: 44px;
  --dv-tab-border-radius: 8px;
  --dv-sash-border-radius: 4px;
  --dv-dropdown-border-radius: 8px;
  --dv-tab-close-icon-size: 8px;
  --dv-floating-group-border: 2px solid var(--dv-group-view-background-color);
  --dv-floating-titlebar-background-color: var(
      --dv-group-view-background-color
  );
  --dv-floating-titlebar-border-bottom: none;
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
  background-color: var(--dv-group-view-background-color);
}
.dockview-theme-light-spaced .dv-dockview {
  padding: 0;
}
.dockview-theme-light-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-light-spaced .dv-sash {
  border-radius: var(--dv-sash-border-radius);
}
.dockview-theme-light-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-light-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-light-spaced .dv-resize-container .dv-groupview {
  border: var(--dv-floating-group-border);
}
.dockview-theme-light-spaced .dv-resize-container > .dv-grid-view {
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
}
.dockview-theme-light-spaced .dv-resize-container-with-titlebar > .dv-grid-view {
  padding-top: 0;
}
.dockview-theme-light-spaced .dv-resize-container-with-titlebar > .dv-floating-titlebar {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-tabs-overflow-container,
.dockview-theme-light-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: var(--dv-dropdown-border-radius);
  height: unset !important;
}
.dockview-theme-light-spaced .dv-render-overlay {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-tab {
  border-radius: var(--dv-tab-border-radius);
}
.dockview-theme-light-spaced .dv-tab .dv-svg {
  height: var(--dv-tab-close-icon-size);
  width: var(--dv-tab-close-icon-size);
}
.dockview-theme-light-spaced .dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-light-spaced .dv-tabs-container-vertical .dv-tab {
  margin: var(--dv-tab-margin-inline) var(--dv-tab-margin-block);
}
.dockview-theme-light-spaced .dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-light-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-groupview .dv-tabs-and-actions-container.dv-groupview-header-vertical {
  padding: calc(var(--dv-border-radius) / 2) 0;
}
.dockview-theme-light-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-groupview.dv-edge-tool-window .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-groupview.dv-edge-tool-window .dv-content-container {
  border-radius: 0;
}
.dockview-theme-light-spaced .dv-groupview.dv-edge-tool-window .dv-tabs-and-actions-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-edge-peek {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-edge-peek-clip {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced {
  color-scheme: light;
  --dv-drag-over-background-color: '';
  --dv-group-view-background-color: #f6f5f9;
  --dv-tabs-and-actions-container-background-color: white;
  --dv-activegroup-visiblepanel-tab-background-color: #ededf0;
  --dv-activegroup-hiddenpanel-tab-background-color: #f9f9fa;
  --dv-inactivegroup-visiblepanel-tab-background-color: #ededf0;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #f9f9fa;
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: rgb(104, 107, 130);
  --dv-activegroup-hiddenpanel-tab-color: rgb(148, 151, 169);
  --dv-inactivegroup-visiblepanel-tab-color: rgb(104, 107, 130);
  --dv-inactivegroup-hiddenpanel-tab-color: rgb(148, 151, 169);
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-active-sash-color: rgb(91, 30, 207);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  --dv-floating-border: 1px solid rgba(0, 0, 0, 0.1);
  --dv-scrollbar-background-color: rgba(0, 0, 0, 0.25);
  --dv-floating-group-border: 2px solid rgba(255, 255, 255, 0.1);
}

.dockview-spaced {
  --dv-spacing-padding: 10px;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 12px;
  --dv-tab-margin-block: 0.5rem;
  --dv-tab-margin-inline: 0.25rem;
  --dv-tab-margin: var(--dv-tab-margin-block) var(--dv-tab-margin-inline);
  --dv-tabs-and-actions-container-height: 44px;
  --dv-tab-border-radius: 8px;
  --dv-sash-border-radius: 4px;
  --dv-dropdown-border-radius: 8px;
  --dv-tab-close-icon-size: 8px;
  --dv-floating-group-border: 2px solid var(--dv-group-view-background-color);
  --dv-floating-titlebar-background-color: var(
      --dv-group-view-background-color
  );
  --dv-floating-titlebar-border-bottom: none;
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
  background-color: var(--dv-group-view-background-color);
}
.dockview-spaced .dv-dockview {
  padding: 0;
}
.dockview-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-spaced .dv-sash {
  border-radius: var(--dv-sash-border-radius);
}
.dockview-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-spaced .dv-resize-container .dv-groupview {
  border: var(--dv-floating-group-border);
}
.dockview-spaced .dv-resize-container > .dv-grid-view {
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
}
.dockview-spaced .dv-resize-container-with-titlebar > .dv-grid-view {
  padding-top: 0;
}
.dockview-spaced .dv-resize-container-with-titlebar > .dv-floating-titlebar {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-tabs-overflow-container,
.dockview-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: var(--dv-dropdown-border-radius);
  height: unset !important;
}
.dockview-spaced .dv-render-overlay {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-tab {
  border-radius: var(--dv-tab-border-radius);
}
.dockview-spaced .dv-tab .dv-svg {
  height: var(--dv-tab-close-icon-size);
  width: var(--dv-tab-close-icon-size);
}
.dockview-spaced .dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-spaced .dv-tabs-container-vertical .dv-tab {
  margin: var(--dv-tab-margin-inline) var(--dv-tab-margin-block);
}
.dockview-spaced .dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-groupview .dv-tabs-and-actions-container.dv-groupview-header-vertical {
  padding: calc(var(--dv-border-radius) / 2) 0;
}
.dockview-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-groupview.dv-edge-tool-window .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-groupview.dv-edge-tool-window .dv-content-container {
  border-radius: 0;
}
.dockview-spaced .dv-groupview.dv-edge-tool-window .dv-tabs-and-actions-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-edge-peek {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-edge-peek-clip {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}

.dv-context-menu {
  min-width: 160px;
  overflow: hidden;
  background: var(--dv-context-menu-background-color, var(--dv-activegroup-hiddenpanel-tab-background-color));
  color: var(--dv-context-menu-color, var(--dv-activegroup-hiddenpanel-tab-color));
  border: 1px solid var(--dv-tab-divider-color);
  border-radius: var(--dv-border-radius);
  box-shadow: var(--dv-floating-box-shadow);
  padding: 4px 0;
}

.dv-context-menu-item {
  height: 25px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: var(--dv-tabs-and-actions-container-font-size);
  white-space: nowrap;
  user-select: none;
}
.dv-context-menu-item:hover {
  background: var(--dv-icon-hover-background-color);
}
.dv-context-menu-item.dv-context-menu-item--disabled {
  opacity: 0.4;
  cursor: default;
  pointer-events: none;
}

.dv-context-menu-separator {
  height: 1px;
  background: var(--dv-tab-divider-color);
  margin: 4px 0;
}

.dv-context-menu-rename {
  padding: 8px 12px 4px;
}

.dv-context-menu-rename-input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid var(--dv-tab-divider-color);
  border-radius: var(--dv-border-radius);
  background: inherit;
  color: var(--dv-activegroup-visiblepanel-tab-color);
  font-size: var(--dv-tabs-and-actions-container-font-size);
  outline: none;
}
.dv-context-menu-rename-input:focus {
  border-color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-context-menu-rename-input::placeholder {
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}

.dv-context-menu-color-picker {
  display: flex;
  flex-direction: row;
  gap: 6px;
  padding: 8px 12px;
  align-items: center;
}

.dv-context-menu-color-swatch {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  flex-shrink: 0;
  background-color: var(--dv-tab-group-color);
}
.dv-context-menu-color-swatch:hover {
  opacity: 0.85;
}
.dv-context-menu-color-swatch.dv-context-menu-color-swatch--selected {
  outline: 2px solid var(--dv-tab-divider-color);
  outline-offset: 2px;
}

.dv-tab-group-indicator-none .dv-groupview-header-bottom .dv-tab-group-underline {
  top: auto;
  bottom: 0;
}

.dv-groupview.dv-groupview-header-bottom.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after, .dv-groupview.dv-groupview-header-bottom.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  top: 0px;
  bottom: auto;
}`,document.head.appendChild(e)}var F,pe=class{constructor(){}},J=class extends pe{constructor(e,t,i,n){super(),this.viewId=e,this.groupId=t,this.panelId=i,this.tabGroupId=n}},te=class extends pe{constructor(e,t){super(),this.viewId=e,this.paneId=t}},ue=class un{constructor(){}static getInstance(){return un.INSTANCE}hasData(t){return t&&t===this.proto}clearData(t){this.hasData(t)&&(this.proto=void 0,this.data=void 0)}getData(t){if(this.hasData(t))return this.data}setData(t,i){i&&(this.data=t,this.proto=i)}};F=ue,ue.INSTANCE=new F;function $(){let e=ue.getInstance();if(e.hasData(J.prototype))return e.getData(J.prototype)[0]}function Ce(){let e=ue.getInstance();if(e.hasData(te.prototype))return e.getData(te.prototype)[0]}let M;(function(e){e.NONE={dispose:()=>{}};function t(i){return{dispose:()=>{i()}}}e.from=t})(M||(M={}));var k=class{get isDisposed(){return this._isDisposed}constructor(...e){this._isDisposed=!1,this._disposables=new Set(e)}addDisposables(...e){e.forEach(t=>this._disposables.add(t))}removeDisposable(e){this._disposables.delete(e)}dispose(){this._isDisposed||(this._isDisposed=!0,this._disposables.forEach(e=>e.dispose()),this._disposables.clear())}},H=class{constructor(){this._disposable=M.NONE}get value(){return this._disposable===M.NONE?void 0:this._disposable}set value(e){this._disposable&&this._disposable.dispose(),this._disposable=e}dispose(){this._disposable&&(this._disposable.dispose(),this._disposable=M.NONE)}};let q;(function(e){e.any=(...t)=>i=>{let n=t.map(o=>o(i));return{dispose:()=>{n.forEach(o=>{o.dispose()})}}}})(q||(q={}));var qe=class{constructor(){this._defaultPrevented=!1}get defaultPrevented(){return this._defaultPrevented}preventDefault(){this._defaultPrevented=!0}},Ot=class{constructor(){this._isAccepted=!1}get isAccepted(){return this._isAccepted}accept(){this._isAccepted=!0}},_n=class{constructor(){this.events=new Map}get size(){return this.events.size}add(e,t){this.events.set(e,t)}delete(e){this.events.delete(e)}clear(){this.events.clear()}},Mt=class gn{static create(){var t;return new gn((t=new Error("listener stacktrace").stack)!==null&&t!==void 0?t:"")}constructor(t){this.value=t}print(){console.warn("dockview: stacktrace",this.value)}},wn=class{constructor(e,t){this.callback=e,this.stacktrace=t}},m=class ve{static setLeakageMonitorEnabled(t){t!==ve.ENABLE_TRACKING&&ve.MEMORY_LEAK_WATCHER.clear(),ve.ENABLE_TRACKING=t}get value(){return this._last}constructor(t){this.options=t,this._listeners=[],this._disposed=!1}get event(){return this._event||(this._event=t=>{var i;!((i=this.options)===null||i===void 0)&&i.replay&&this._last!==void 0&&t(this._last);let n=new wn(t,ve.ENABLE_TRACKING?Mt.create():void 0);return this._listeners.push(n),{dispose:()=>{let o=this._listeners.indexOf(n);o>-1?this._listeners.splice(o,1):ve.ENABLE_TRACKING}}},ve.ENABLE_TRACKING&&ve.MEMORY_LEAK_WATCHER.add(this._event,Mt.create())),this._event}fire(t){var i;if(this._pauseTokens!==void 0&&this._pauseTokens.size>0)return;!((i=this.options)===null||i===void 0)&&i.replay&&(this._last=t);let n=this._listeners,o=n.length;if(o!==0){if(o===1){n[0].callback(t);return}for(let r of n.slice())r.callback(t)}}pause(){var t;let i={};return(t=this._pauseTokens)!==null&&t!==void 0||(this._pauseTokens=new Set),this._pauseTokens.add(i),M.from(()=>{var n;return(n=this._pauseTokens)===null||n===void 0?void 0:n.delete(i)})}dispose(){this._disposed||(this._disposed=!0,this._listeners.length>0&&(ve.ENABLE_TRACKING?queueMicrotask(()=>{for(let i of this._listeners){var t;console.warn("dockview: stacktrace",(t=i.stacktrace)===null||t===void 0?void 0:t.print())}this._listeners=[]}):this._listeners=[]),ve.ENABLE_TRACKING&&this._event&&ve.MEMORY_LEAK_WATCHER.delete(this._event))}};m.ENABLE_TRACKING=!1,m.MEMORY_LEAK_WATCHER=new _n;function C(e,t,i,n){return e.addEventListener(t,i,n),{dispose:()=>{e.removeEventListener(t,i,n)}}}var Lt=class{constructor(){this._onFired=new m,this._currentFireCount=0,this._queued=!1,this.onEvent=e=>{let t=this._currentFireCount;return this._onFired.event(()=>{this._currentFireCount>t&&e()})}}fire(){this._currentFireCount++,!this._queued&&(this._queued=!0,queueMicrotask(()=>{this._queued=!1,this._onFired.fire()}))}dispose(){this._onFired.dispose()}},Dn=class extends k{constructor(e){super(),this._onDidChange=new m,this.onDidChange=this._onDidChange.event,this._value=null,this.addDisposables(this._onDidChange,_e(e,t=>{let i=t.target.scrollWidth>t.target.clientWidth,n=t.target.scrollHeight>t.target.clientHeight;this._value={hasScrollX:i,hasScrollY:n},this._onDidChange.fire(this._value)}))}};function _e(e,t){let i=new ResizeObserver(n=>{requestAnimationFrame(()=>{let o=n[0];t(o)})});return i.observe(e),{dispose:()=>{i.unobserve(e),i.disconnect()}}}let oe=(e,...t)=>{for(let i of t)e.classList.contains(i)&&e.classList.remove(i)},re=(e,...t)=>{for(let i of t)e.classList.contains(i)||e.classList.add(i)},x=(e,t,i)=>{let n=e.classList.contains(t);i&&!n&&e.classList.add(t),!i&&n&&e.classList.remove(t)};function Qe(e,t){for(;e;){if(e===t)return!0;e=e.parentNode}return!1}function Rt(e){return new xn(e)}var xn=class extends k{constructor(e){super(),this._onDidFocus=new m,this.onDidFocus=this._onDidFocus.event,this._onDidBlur=new m,this.onDidBlur=this._onDidBlur.event,this.addDisposables(this._onDidFocus,this._onDidBlur);let t=Qe(document.activeElement,e),i=!1,n=()=>{i=!1,t||(t=!0,this._onDidFocus.fire())},o=()=>{t&&(i=!0,globalThis.setTimeout(()=>{i&&(i=!1,t=!1,this._onDidBlur.fire())},0))};this._refreshStateHandler=()=>{Qe(document.activeElement,e)!==t&&(t?o():n())},this.addDisposables(C(e,"focus",n,!0)),this.addDisposables(C(e,"blur",o,!0))}refreshState(){this._refreshStateHandler()}};let Vt="dv-quasiPreventDefault";function $t(e){e[Vt]=!0}function Nt(e){return e[Vt]}function yn(e,t,i={}){let n=Array.from(t),{nonce:o}=i,r=typeof o=="function"?o(e):o;for(let a of n){if(a.href){let l=e.createElement("link");l.href=a.href,l.type=a.type,l.rel="stylesheet",e.head.appendChild(l);continue}let s=[];try{a.cssRules&&(s=Array.from(a.cssRules).map(l=>l.cssText))}catch(l){console.warn("dockview: failed to access stylesheet rules due to security restrictions",l)}let d=e.createDocumentFragment();for(let l of s){let h=e.createElement("style");r&&h.setAttribute("nonce",r),h.appendChild(e.createTextNode(l)),d.appendChild(h)}e.head.appendChild(d)}}function et(e){let{left:t,top:i,width:n,height:o}=e.getBoundingClientRect();return{left:t+window.scrollX,top:i+window.scrollY,width:n,height:o}}function Wt(e){let t=e;for(;t?.parentNode;){if(t.parentNode===document)return!0;t.parentNode instanceof DocumentFragment?t=t.parentNode.host:t=t.parentNode}return!1}function Cn(e,t){e.dataset.testid=t}function Sn(e,t){let i=[];function n(o){if(o.nodeType===Node.ELEMENT_NODE){e.includes(o.tagName)&&i.push(o),o.shadowRoot&&n(o.shadowRoot);for(let r of o.children)n(r)}}return n(t instanceof Document?t.documentElement:t),i}function Ge(e=document){let t=Sn(["IFRAME","WEBVIEW"],e),i=new WeakMap;for(let n of t)i.set(n,n.style.pointerEvents),n.style.pointerEvents="none";return{release:()=>{for(let o of t){var n;o.style.pointerEvents=(n=i.get(o))!==null&&n!==void 0?n:"auto"}t.splice(0,t.length)}}}function kn(e){function t(o){let r=[];for(let a=0;a<o.classList.length;a++)r.push(o.classList.item(a));return r}let i,n=e;for(;n!==null&&(i=t(n).find(o=>o.startsWith("dockview-theme-")),typeof i!="string");)n=n.parentElement;return i}var Oe=class{constructor(e){this.element=e,this._classNames=[]}setClassNames(e){for(let t of this._classNames)x(this.element,t,!1);this._classNames=e.split(" ").filter(t=>t.trim().length>0);for(let t of this._classNames)x(this.element,t,!0)}};let Ht=100;function tt(e,t){let i=et(e),n=et(t);return!(i.left<n.left||i.left+i.width>n.left+n.width||i.top<n.top||i.top+i.height>n.top+n.height)}function Gn(e){let t=new m,i=e.screenX,n=e.screenY,o,r=0,a=!1,s=()=>{if(a||e.closed)return;let l=e.screenX,h=e.screenY;(l!==i||h!==n)&&(clearTimeout(o),o=setTimeout(()=>{t.fire()},Ht),i=l,n=h),r=requestAnimationFrame(s)};s();let d=t.dispose.bind(t);return t.dispose=()=>{a||(a=!0,cancelAnimationFrame(r),clearTimeout(o)),d()},t}function zn(e,t){let i;return new k(C(e,"resize",()=>{clearTimeout(i),i=setTimeout(()=>{t()},Ht)}))}function Pn(e,t,i){var n;let o=(n=i?.buffer)!==null&&n!==void 0?n:10,r=e.getBoundingClientRect(),a=t.getBoundingClientRect(),s=0,d=0,l=r.left-a.left,h=r.top-a.top,c=r.bottom-a.bottom,v=r.right-a.right;l<o?s=o-l:v>o&&(s=-o-v),h<o?d=o-h:c>o&&(d=-c-o),(s!==0||d!==0)&&(e.style.transform=`translate(${s}px, ${d}px)`)}function it(e){let t=e;for(;t&&(t.style.zIndex==="auto"||t.style.zIndex==="");)t=t.parentElement;return t}function Tn(e=document){var t,i;let n=(t=e.defaultView)===null||t===void 0||(i=t.matchMedia)===null||i===void 0?void 0:i.call(t,"(prefers-reduced-motion: reduce)");return!!n?.matches}function In(e){let t=e.ownerDocument.defaultView;if(!t)return"";let i=e;for(;i;){let n=t.getComputedStyle(i).backgroundColor;if(n&&n!=="transparent"&&!/,\s*0\)\s*$/.test(n))return n;i=i.parentElement}return""}function ae(e){if(e.length===0)throw new Error("Invalid tail call");return[e.slice(0,e.length-1),e[e.length-1]]}function nt(e,t){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(e[i]!==t[i])return!1;return!0}function ot(e,t){let i=e.indexOf(t);i>-1&&(e.splice(i,1),e.unshift(t))}function Me(e,t){let i=e.indexOf(t);i>-1&&(e.splice(i,1),e.push(t))}function An(e,t){for(let i=0;i<e.length;i++){let n=e[i];if(t(n))return i}return-1}function Ft(e,t){let i=e.indexOf(t);return i>-1?(e.splice(i,1),!0):!1}let N=(e,t,i)=>t>i?t:Math.min(i,Math.max(e,t)),rt=()=>{let e=1;return{next:()=>(e++).toString()}},se=(e,t)=>{let i=[];if(typeof t!="number"&&(t=e,e=0),e<=t)for(let n=e;n<t;n++)i.push(n);else for(let n=e;n>t;n--)i.push(n);return i};var En=class{set size(e){this._size=e}setContainerGeometry(e,t){this._appliedStyles[e]!==t&&(this._appliedStyles[e]=t,this.container.style[e]=t)}get size(){return this._size}get cachedVisibleSize(){return this._cachedVisibleSize}get visible(){return this._cachedVisibleSize===void 0}get minimumSize(){return this.visible?this.view.minimumSize:0}get viewMinimumSize(){return this.view.minimumSize}get maximumSize(){return this.visible?this.view.maximumSize:0}get viewMaximumSize(){return this.view.maximumSize}get priority(){return this.view.priority}get snap(){return!!this.view.snap}set enabled(e){this.container.style.pointerEvents=e?"":"none"}constructor(e,t,i,n){this.container=e,this.view=t,this.disposable=n,this._cachedVisibleSize=void 0,this._appliedStyles={},typeof i=="number"?(this._size=i,this._cachedVisibleSize=void 0,e.classList.add("visible")):(this._size=0,this._cachedVisibleSize=i.cachedVisibleSize)}setVisible(e,t){if(e!==this.visible){if(e){var i;this.size=N((i=this._cachedVisibleSize)!==null&&i!==void 0?i:0,this.viewMinimumSize,this.viewMaximumSize),this._cachedVisibleSize=void 0}else this._cachedVisibleSize=typeof t=="number"?t:this.size,this.size=0;this.container.classList.toggle("visible",e),this.view.setVisible&&this.view.setVisible(e)}}dispose(){return this.disposable.dispose(),this.view}};let On=(function(e){return e.HORIZONTAL="HORIZONTAL",e.VERTICAL="VERTICAL",e})({}),Mn=(function(e){return e[e.MAXIMUM=0]="MAXIMUM",e[e.MINIMUM=1]="MINIMUM",e[e.DISABLED=2]="DISABLED",e[e.ENABLED=3]="ENABLED",e})({}),Ln=(function(e){return e.Low="low",e.High="high",e.Normal="normal",e})({});function Bt(e,t,i){e.appliedLeft!==t&&(e.appliedLeft=t,e.container.style.left=t),e.appliedTop!==i&&(e.appliedTop=i,e.container.style.top=i)}let X;(function(e){e.Distribute={type:"distribute"};function t(n){return{type:"split",index:n}}e.Split=t;function i(n){return{type:"invisible",cachedVisibleSize:n}}e.Invisible=i})(X||(X={}));var be=class{get contentSize(){return this._contentSize}get size(){return this._size}set size(e){this._size=e}get orthogonalSize(){return this._orthogonalSize}set orthogonalSize(e){this._orthogonalSize=e}get length(){return this.viewItems.length}get proportions(){return this._proportions?[...this._proportions]:void 0}get orientation(){return this._orientation}set orientation(e){this._orientation=e;let t=this.size;this.size=this.orthogonalSize,this.orthogonalSize=t,oe(this.element,"dv-horizontal","dv-vertical"),this.element.classList.add(this.orientation=="HORIZONTAL"?"dv-horizontal":"dv-vertical")}get minimumSize(){return this.viewItems.reduce((e,t)=>e+t.minimumSize,0)}get maximumSize(){return this.length===0?Number.POSITIVE_INFINITY:this.viewItems.reduce((e,t)=>e+t.maximumSize,0)}get startSnappingEnabled(){return this._startSnappingEnabled}set startSnappingEnabled(e){this._startSnappingEnabled!==e&&(this._startSnappingEnabled=e,this.updateSashEnablement())}get endSnappingEnabled(){return this._endSnappingEnabled}set endSnappingEnabled(e){this._endSnappingEnabled!==e&&(this._endSnappingEnabled=e,this.updateSashEnablement())}get disabled(){return this._disabled}set disabled(e){this._disabled=e,x(this.element,"dv-splitview-disabled",e)}get margin(){return this._margin}set margin(e){this._margin=e,x(this.element,"dv-splitview-has-margin",e!==0)}constructor(e,t){var i,n;this.container=e,this.viewItems=[],this.sashes=[],this._size=0,this._orthogonalSize=0,this._contentSize=0,this._proportions=void 0,this._startSnappingEnabled=!0,this._endSnappingEnabled=!0,this._disabled=!1,this._margin=0,this._onDidSashEnd=new m,this.onDidSashEnd=this._onDidSashEnd.event,this._onDidAddView=new m,this.onDidAddView=this._onDidAddView.event,this._onDidRemoveView=new m,this.onDidRemoveView=this._onDidRemoveView.event,this.resize=(o,r,a=this.viewItems.map(p=>p.size),s,d,l=Number.NEGATIVE_INFINITY,h=Number.POSITIVE_INFINITY,c,v)=>{if(o<0||o>this.viewItems.length)return 0;let p=se(o,-1),u=se(o+1,this.viewItems.length);if(d)for(let z of d)ot(p,z),ot(u,z);if(s)for(let z of s)Me(p,z),Me(u,z);let g=p.reduce((z,I)=>z+this.viewItems[I].minimumSize-a[I],0),b=p.reduce((z,I)=>z+this.viewItems[I].maximumSize-a[I],0),D=u.length===0?Number.POSITIVE_INFINITY:u.reduce((z,I)=>z+a[I]-this.viewItems[I].minimumSize,0),w=u.length===0?Number.NEGATIVE_INFINITY:u.reduce((z,I)=>z+a[I]-this.viewItems[I].maximumSize,0),_=Math.max(g,w),S=Math.min(D,b),T=!1;if(c){let z=this.viewItems[c.index],I=r>=c.limitDelta;T=I!==z.visible,z.setVisible(I,c.size)}if(!T&&v){let z=this.viewItems[v.index],I=r<v.limitDelta;T=I!==z.visible,z.setVisible(I,v.size)}if(T)return this.resize(o,r,a,s,d,l,h);let y=N(r,_,S),P=0,A=y;for(let z of p){let I=this.viewItems[z],W=a[z],B=N(W+A,I.minimumSize,I.maximumSize),R=B-W;P+=R,A-=R,I.size=B}let O=P;for(let z of u){let I=this.viewItems[z],W=a[z],B=N(W-O,I.minimumSize,I.maximumSize),R=B-W;O+=R,I.size=B}return r},this._orientation=(i=t.orientation)!==null&&i!==void 0?i:"VERTICAL",this.element=this.createContainer(),this.margin=(n=t.margin)!==null&&n!==void 0?n:0,this.proportionalLayout=t.proportionalLayout===void 0?!0:!!t.proportionalLayout,this.viewContainer=this.createViewContainer(),this.sashContainer=this.createSashContainer(),this.element.appendChild(this.sashContainer),this.element.appendChild(this.viewContainer),this.container.appendChild(this.element),this.style(t.styles),t.descriptor&&(this._size=t.descriptor.size,t.descriptor.views.forEach((o,r)=>{let a=o.visible===void 0||o.visible?o.size:{type:"invisible",cachedVisibleSize:o.size},s=o.view;this.addView(s,a,r,!0)}),this._contentSize=this.viewItems.reduce((o,r)=>o+r.size,0),this.saveProportions())}style(e){e?.separatorBorder==="transparent"?(oe(this.element,"dv-separator-border"),this.element.style.removeProperty("--dv-separator-border")):(re(this.element,"dv-separator-border"),e?.separatorBorder&&this.element.style.setProperty("--dv-separator-border",e.separatorBorder))}isViewVisible(e){if(e<0||e>=this.viewItems.length)throw new Error("Index out of bounds");return this.viewItems[e].visible}setViewVisible(e,t){if(e<0||e>=this.viewItems.length)throw new Error("Index out of bounds");let i=this.viewItems[e];i.setVisible(t,i.size),this.distributeEmptySpace(e),this.layoutViews(),this.saveProportions()}getViewSize(e){return e<0||e>=this.viewItems.length?-1:this.viewItems[e].size}resizeView(e,t){if(e<0||e>=this.viewItems.length)return;let i=se(this.viewItems.length).filter(a=>a!==e),n=[...i.filter(a=>this.viewItems[a].priority==="low"),e],o=i.filter(a=>this.viewItems[a].priority==="high"),r=this.viewItems[e];t=Math.round(t),t=N(t,r.minimumSize,Math.min(r.maximumSize,this._size)),r.size=t,this.relayout(n,o)}getViews(){return this.viewItems.map(e=>e.view)}onDidChange(e,t){let i=this.viewItems.indexOf(e);if(i<0||i>=this.viewItems.length)return;t=typeof t=="number"?t:e.size,t=N(t,e.minimumSize,e.maximumSize),e.size=t;let n=se(this.viewItems.length).filter(a=>a!==i),o=[...n.filter(a=>this.viewItems[a].priority==="low"),i],r=n.filter(a=>this.viewItems[a].priority==="high");this.relayout([...o,i],r)}addView(e,t=X.Distribute,i=this.viewItems.length,n){let o=document.createElement("div");o.className="dv-view",o.appendChild(e.element);let r;if(typeof t=="number")r=t;else if(t.type==="split"){let d=this.viewItems[t.index];if(d){let l=Math.floor(d.size/2);r=d.size-l,d.size=l}else r=this.getViewSize(t.index)/2}else t.type==="invisible"?r={cachedVisibleSize:t.cachedVisibleSize}:r=e.minimumSize;let a=e.onDidChange(d=>this.onDidChange(s,d.size)),s=new En(o,e,r,{dispose:()=>{a.dispose(),o.remove()}});if(i===this.viewItems.length?this.viewContainer.appendChild(o):this.viewContainer.insertBefore(o,this.viewContainer.children.item(i)),this.viewItems.splice(i,0,s),this.viewItems.length>1){let d=document.createElement("div");d.className="dv-sash";let l=c=>{var v;for(let L of this.viewItems)L.enabled=!1;let p=(v=d.ownerDocument)!==null&&v!==void 0?v:document,u=Ge(p),g=this._orientation==="HORIZONTAL"?c.clientX:c.clientY,b=An(this.sashes,L=>L.container===d),D=this.viewItems.map(L=>L.size),w,_,S=se(b,-1),T=se(b+1,this.viewItems.length),y=S.reduce((L,E)=>L+(this.viewItems[E].minimumSize-D[E]),0),P=S.reduce((L,E)=>L+(this.viewItems[E].viewMaximumSize-D[E]),0),A=T.length===0?Number.POSITIVE_INFINITY:T.reduce((L,E)=>L+(D[E]-this.viewItems[E].minimumSize),0),O=T.length===0?Number.NEGATIVE_INFINITY:T.reduce((L,E)=>L+(D[E]-this.viewItems[E].viewMaximumSize),0),z=Math.max(y,O),I=Math.min(A,P),W=this.findFirstSnapIndex(S),B=this.findFirstSnapIndex(T);if(typeof W=="number"){let L=this.viewItems[W],E=Math.floor(L.viewMinimumSize/2);w={index:W,limitDelta:L.visible?z-E:z+E,size:L.size}}if(typeof B=="number"){let L=this.viewItems[B],E=Math.floor(L.viewMinimumSize/2);_={index:B,limitDelta:L.visible?I+E:I-E,size:L.size}}let R=L=>{let E=(this._orientation==="HORIZONTAL"?L.clientX:L.clientY)-g;this.resize(b,E,D,void 0,void 0,z,I,w,_),this.distributeEmptySpace(),this.layoutViews()},U=()=>{for(let L of this.viewItems)L.enabled=!0;u.release(),this.saveProportions(),p.removeEventListener("pointermove",R),p.removeEventListener("pointerup",U),p.removeEventListener("pointercancel",U),p.removeEventListener("contextmenu",U),this._onDidSashEnd.fire(void 0)};p.addEventListener("pointermove",R),p.addEventListener("pointerup",U),p.addEventListener("pointercancel",U),p.addEventListener("contextmenu",U)};d.addEventListener("pointerdown",l);let h={container:d,disposable:()=>{d.removeEventListener("pointerdown",l),d.remove()}};this.sashContainer.appendChild(d),this.sashes.push(h)}n||this.relayout([i]),!n&&typeof t!="number"&&t.type==="distribute"&&this.distributeViewSizes(),this._onDidAddView.fire(e)}distributeViewSizes(){let e=[],t=0;for(let a of this.viewItems)a.maximumSize-a.minimumSize>0&&(e.push(a),t+=a.size);let i=Math.floor(t/e.length);for(let a of e)a.size=N(i,a.minimumSize,a.maximumSize);let n=se(this.viewItems.length),o=n.filter(a=>this.viewItems[a].priority==="low"),r=n.filter(a=>this.viewItems[a].priority==="high");this.relayout(o,r)}removeView(e,t,i=!1){let n=this.viewItems.splice(e,1)[0];if(n.dispose(),this.viewItems.length>=1){let o=Math.max(e-1,0);this.sashes.splice(o,1)[0].disposable()}return i||this.relayout(),t?.type==="distribute"&&this.distributeViewSizes(),this._onDidRemoveView.fire(n.view),n.view}getViewCachedVisibleSize(e){if(e<0||e>=this.viewItems.length)throw new Error("Index out of bounds");return this.viewItems[e].cachedVisibleSize}moveView(e,t){let i=this.getViewCachedVisibleSize(e),n=i===void 0?this.getViewSize(e):X.Invisible(i),o=this.removeView(e,void 0,!0);this.addView(o,n,t)}layout(e,t){let i=Math.max(this.size,this._contentSize);if(this.size=e,this.orthogonalSize=t,this.proportions){let n=0;for(let o=0;o<this.viewItems.length;o++){let r=this.viewItems[o],a=this.proportions[o];typeof a=="number"?n+=a:e-=r.size}for(let o=0;o<this.viewItems.length;o++){let r=this.viewItems[o],a=this.proportions[o];typeof a=="number"&&n>0&&(r.size=N(Math.round(a*e/n),r.minimumSize,r.maximumSize))}}else{let n=se(this.viewItems.length),o=n.filter(a=>this.viewItems[a].priority==="low"),r=n.filter(a=>this.viewItems[a].priority==="high");this.resize(this.viewItems.length-1,e-i,void 0,o,r)}this.distributeEmptySpace(),this.layoutViews()}relayout(e,t){let i=this.viewItems.reduce((n,o)=>n+o.size,0);this.resize(this.viewItems.length-1,this._size-i,void 0,e,t),this.distributeEmptySpace(),this.layoutViews(),this.saveProportions()}distributeEmptySpace(e){let t=0;for(let r of this.viewItems)t+=r.size;let i=this.size-t;if(i===0)return;let n=se(this.viewItems.length-1,-1),o=!1;for(let r of this.viewItems)if(r.priority==="low"||r.priority==="high"){o=!0;break}if(o){let r=n.filter(s=>this.viewItems[s].priority==="low"),a=n.filter(s=>this.viewItems[s].priority==="high");for(let s of a)ot(n,s);for(let s of r)Me(n,s)}typeof e=="number"&&Me(n,e);for(let r=0;i!==0&&r<n.length;r++){let a=this.viewItems[n[r]],s=N(a.size+i,a.minimumSize,a.maximumSize),d=s-a.size;i-=d,a.size=s}}saveProportions(){this.proportionalLayout&&this._contentSize>0&&(this._proportions=this.viewItems.map(e=>e.visible?e.size/this._contentSize:void 0))}layoutViews(){let e=0,t=0;for(let d of this.viewItems)e+=d.size,d.visible&&t++;if(this._contentSize=e,this.updateSashEnablement(),this.viewItems.length===0)return;let i=Math.max(0,t-1),n=this.margin*i/Math.max(1,t),o=0,r=[],a=4,s=0;this.viewItems.forEach((d,l)=>{o+=this.viewItems[l].size,r.push(o),s+=d.visible?1:0;let h=d.visible?d.size-n:0,c=Math.max(0,s-1),v=l===0||c===0?0:r[l-1]+c/i*n;if(l<this.viewItems.length-1){let p=d.visible?v+h-a/2+this.margin/2:v,u=this.sashes[l];this._orientation==="HORIZONTAL"&&Bt(u,`${p}px`,"0px"),this._orientation==="VERTICAL"&&Bt(u,"0px",`${p}px`)}this._orientation==="HORIZONTAL"&&(d.setContainerGeometry("width",`${h}px`),d.setContainerGeometry("left",`${v}px`),d.setContainerGeometry("top",""),d.setContainerGeometry("height","")),this._orientation==="VERTICAL"&&(d.setContainerGeometry("height",`${h}px`),d.setContainerGeometry("top",`${v}px`),d.setContainerGeometry("width",""),d.setContainerGeometry("left","")),d.view.layout(d.size-n,this._orthogonalSize)})}findFirstSnapIndex(e){for(let t of e){let i=this.viewItems[t];if(i.visible&&i.snap)return t}for(let t of e){let i=this.viewItems[t];if(i.visible&&i.maximumSize-i.minimumSize>0)return;if(!i.visible&&i.snap)return t}}updateSashEnablement(){if(this.sashes.length===0)return;let e=!1,t=this.viewItems.map(s=>e=s.size-s.minimumSize>0||e);e=!1;let i=this.viewItems.map(s=>e=s.maximumSize-s.size>0||e),n=[...this.viewItems].reverse();e=!1;let o=n.map(s=>e=s.size-s.minimumSize>0||e).reverse();e=!1;let r=n.map(s=>e=s.maximumSize-s.size>0||e).reverse(),a=0;for(let s=0;s<this.sashes.length;s++){let d=this.sashes[s],l=this.viewItems[s];a+=l.size;let h=!(t[s]&&r[s+1]),c=!(i[s]&&o[s+1]);if(h&&c){let v=se(s,-1),p=se(s+1,this.viewItems.length),u=this.findFirstSnapIndex(v),g=this.findFirstSnapIndex(p),b=typeof u=="number"&&!this.viewItems[u].visible,D=typeof g=="number"&&!this.viewItems[g].visible;b&&o[s]&&(a>0||this.startSnappingEnabled)?this.updateSash(d,1):D&&t[s]&&(a<this._contentSize||this.endSnappingEnabled)?this.updateSash(d,0):this.updateSash(d,2)}else h&&!c?this.updateSash(d,1):!h&&c?this.updateSash(d,0):this.updateSash(d,3)}}updateSash(e,t){x(e.container,"dv-disabled",t===2),x(e.container,"dv-enabled",t===3),x(e.container,"dv-maximum",t===0),x(e.container,"dv-minimum",t===1)}createViewContainer(){let e=document.createElement("div");return e.className="dv-view-container",e}createSashContainer(){let e=document.createElement("div");return e.className="dv-sash-container",e}createContainer(){let e=document.createElement("div");return e.className=`dv-split-view-container ${this._orientation==="HORIZONTAL"?"dv-horizontal":"dv-vertical"}`,e}dispose(){this._onDidSashEnd.dispose(),this._onDidAddView.dispose(),this._onDidRemoveView.dispose();for(let e=0;e<this.element.children.length;e++)if(this.element.children.item(e)===this.element){this.element.remove();break}for(let e of this.viewItems)e.dispose();this.element.remove()}};let Rn=Object.keys({orientation:void 0,descriptor:void 0,proportionalLayout:void 0,styles:void 0,margin:void 0,disableAutoResizing:void 0,className:void 0});var at=class extends k{get onDidAddView(){return this.splitview.onDidAddView}get onDidRemoveView(){return this.splitview.onDidRemoveView}get minimumSize(){return this.splitview.minimumSize}get maximumSize(){return this.splitview.maximumSize}get orientation(){return this.splitview.orientation}get size(){return this.splitview.size}get orthogonalSize(){return this.splitview.orthogonalSize}constructor(e,t){var i;super(),this.paneItems=[],this.skipAnimation=!1,this._onDidChange=new m,this.onDidChange=this._onDidChange.event,this._orientation=(i=t.orientation)!==null&&i!==void 0?i:"VERTICAL",this.element=document.createElement("div"),this.element.className="dv-pane-container",e.appendChild(this.element),this.splitview=new be(this.element,{orientation:this._orientation,proportionalLayout:!1,descriptor:t.descriptor}),this.getPanes().forEach(n=>{let o=new k(n.onDidChangeExpansionState(()=>{this.setupAnimation(),this._onDidChange.fire(void 0)})),r={pane:n,disposable:{dispose:()=>{o.dispose()}}};this.paneItems.push(r),n.orthogonalSize=this.splitview.orthogonalSize}),this.addDisposables(this._onDidChange,this.splitview.onDidSashEnd(()=>{this._onDidChange.fire(void 0)}),this.splitview.onDidAddView(()=>{this._onDidChange.fire()}),this.splitview.onDidRemoveView(()=>{this._onDidChange.fire()}))}setViewVisible(e,t){this.splitview.setViewVisible(e,t)}addPane(e,t,i=this.splitview.length,n=!1){let o=e.onDidChangeExpansionState(()=>{this.setupAnimation(),this._onDidChange.fire(void 0)}),r={pane:e,disposable:{dispose:()=>{o.dispose()}}};this.paneItems.splice(i,0,r),e.orthogonalSize=this.splitview.orthogonalSize,this.splitview.addView(e,t,i,n)}getViewSize(e){return this.splitview.getViewSize(e)}getViewCachedVisibleSize(e){return this.splitview.getViewCachedVisibleSize(e)}getPanes(){return this.splitview.getViews()}removePane(e,t){let i=this.paneItems.splice(e,1)[0];return this.splitview.removeView(e),t?.skipDispose||(i.disposable.dispose(),i.pane.dispose()),i}moveView(e,t){if(e===t)return;let i=this.removePane(e,{skipDispose:!0});i.disposable.dispose(),this.skipAnimation=!0;try{this.addPane(i.pane,i.pane.size,t,!1)}finally{this.skipAnimation=!1}}layout(e,t){this.splitview.layout(e,t)}setupAnimation(){this.skipAnimation||(this.animationTimer&&(clearTimeout(this.animationTimer),this.animationTimer=void 0),re(this.element,"dv-animated"),this.animationTimer=setTimeout(()=>{this.animationTimer=void 0,oe(this.element,"dv-animated")},200))}dispose(){super.dispose(),this.animationTimer&&(clearTimeout(this.animationTimer),this.animationTimer=void 0),this.paneItems.forEach(e=>{e.disposable.dispose(),e.pane.dispose()}),this.paneItems=[],this.splitview.dispose(),this.element.remove()}},Z=class{get minimumWidth(){return this.view.minimumWidth}get maximumWidth(){return this.view.maximumWidth}get minimumHeight(){return this.view.minimumHeight}get maximumHeight(){return this.view.maximumHeight}get priority(){return this.view.priority}get snap(){return this.view.snap}get minimumSize(){return this.orientation==="HORIZONTAL"?this.minimumHeight:this.minimumWidth}get maximumSize(){return this.orientation==="HORIZONTAL"?this.maximumHeight:this.maximumWidth}get minimumOrthogonalSize(){return this.orientation==="HORIZONTAL"?this.minimumWidth:this.minimumHeight}get maximumOrthogonalSize(){return this.orientation==="HORIZONTAL"?this.maximumWidth:this.maximumHeight}get orthogonalSize(){return this._orthogonalSize}get size(){return this._size}get element(){return this.view.element}get width(){return this.orientation==="HORIZONTAL"?this.orthogonalSize:this.size}get height(){return this.orientation==="HORIZONTAL"?this.size:this.orthogonalSize}constructor(e,t,i,n=0){this.view=e,this.orientation=t,this._onDidChange=new m,this.onDidChange=this._onDidChange.event,this._orthogonalSize=i,this._size=n,this._disposable=this.view.onDidChange(o=>{o?this._onDidChange.fire({size:this.orientation==="VERTICAL"?o.width:o.height,orthogonalSize:this.orientation==="VERTICAL"?o.height:o.width}):this._onDidChange.fire({})})}setVisible(e){this.view.setVisible&&this.view.setVisible(e)}layout(e,t){this._size=e,this._orthogonalSize=t,this.view.layout(this.width,this.height)}dispose(){this._onDidChange.dispose(),this._disposable.dispose()}},Y=class Et extends k{get width(){return this.orientation==="HORIZONTAL"?this.size:this.orthogonalSize}get height(){return this.orientation==="HORIZONTAL"?this.orthogonalSize:this.size}get minimumSize(){if(this._cachedMinimumSize===void 0){let t=0;for(let i=0;i<this.children.length;i++)this.splitview.isViewVisible(i)&&(t=Math.max(t,this.children[i].minimumOrthogonalSize));this._cachedMinimumSize=t}return this._cachedMinimumSize}get maximumSize(){if(this._cachedMaximumSize===void 0){let t=Number.POSITIVE_INFINITY;for(let i=0;i<this.children.length;i++)this.splitview.isViewVisible(i)&&(t=Math.min(t,this.children[i].maximumOrthogonalSize));this._cachedMaximumSize=t}return this._cachedMaximumSize}get minimumOrthogonalSize(){return this.splitview.minimumSize}get maximumOrthogonalSize(){return this.splitview.maximumSize}get orthogonalSize(){return this._orthogonalSize}get size(){return this._size}get minimumWidth(){return this.orientation==="HORIZONTAL"?this.minimumOrthogonalSize:this.minimumSize}get minimumHeight(){return this.orientation==="HORIZONTAL"?this.minimumSize:this.minimumOrthogonalSize}get maximumWidth(){return this.orientation==="HORIZONTAL"?this.maximumOrthogonalSize:this.maximumSize}get maximumHeight(){return this.orientation==="HORIZONTAL"?this.maximumSize:this.maximumOrthogonalSize}get priority(){var t;return(t=this._cachedPriority)!==null&&t!==void 0||(this._cachedPriority=this.computePriority()),this._cachedPriority}computePriority(){if(this.children.length===0)return"normal";let t=!1,i=!1;for(let o of this.children){var n;let r=(n=o.priority)!==null&&n!==void 0?n:"normal";r==="high"?t=!0:r==="low"&&(i=!0)}return t?"high":i?"low":"normal"}invalidateCachedSizes(){this._cachedMinimumSize=void 0,this._cachedMaximumSize=void 0,this._cachedPriority=void 0}get disabled(){return this.splitview.disabled}set disabled(t){this.splitview.disabled=t}get margin(){return this.splitview.margin}set margin(t){this.splitview.margin=t,this.children.forEach(i=>{i instanceof Et&&(i.margin=t)})}constructor(t,i,n,o,r,a,s,d){if(super(),this.orientation=t,this.proportionalLayout=i,this.styles=n,this._childrenDisposable=M.NONE,this.children=[],this._onDidChange=new m,this.onDidChange=this._onDidChange.event,this._onDidVisibilityChange=new m,this.onDidVisibilityChange=this._onDidVisibilityChange.event,this._orthogonalSize=r,this._size=o,this.element=document.createElement("div"),this.element.className="dv-branch-node",d){let l={views:d.map(h=>{var c;return{view:h.node,size:h.node.size,visible:(c=h.visible)!==null&&c!==void 0?c:!0}}),size:this.orthogonalSize};this.children=d.map(h=>h.node),this.splitview=new be(this.element,{orientation:this.orientation,descriptor:l,proportionalLayout:i,styles:n,margin:s})}else this.splitview=new be(this.element,{orientation:this.orientation,proportionalLayout:i,styles:n,margin:s}),this.splitview.layout(this.size,this.orthogonalSize);this.disabled=a,this.addDisposables(this._onDidChange,this._onDidVisibilityChange,this.splitview.onDidSashEnd(()=>{this._onDidChange.fire({})})),this.setupChildrenEvents()}setVisible(t){}isChildVisible(t){if(t<0||t>=this.children.length)throw new Error("Invalid index");return this.splitview.isViewVisible(t)}setChildVisible(t,i){if(t<0||t>=this.children.length)throw new Error("Invalid index");if(this.splitview.isViewVisible(t)===i)return;let n=this.splitview.contentSize===0;this.splitview.setViewVisible(t,i),this.invalidateCachedSizes();let o=this.splitview.contentSize===0;(i&&n||!i&&o)&&this._onDidVisibilityChange.fire({visible:i})}moveChild(t,i){if(t===i)return;if(t<0||t>=this.children.length)throw new Error("Invalid from index");t<i&&i--,this.splitview.moveView(t,i);let n=this._removeChild(t);this._addChild(n,i)}getChildSize(t){if(t<0||t>=this.children.length)throw new Error("Invalid index");return this.splitview.getViewSize(t)}resizeChild(t,i){if(t<0||t>=this.children.length)throw new Error("Invalid index");this.splitview.resizeView(t,i)}layout(t,i){this._size=i,this._orthogonalSize=t,this.splitview.layout(i,t)}addChild(t,i,n,o){if(n<0||n>this.children.length)throw new Error("Invalid index");this.splitview.addView(t,i,n,o),this._addChild(t,n)}getChildCachedVisibleSize(t){if(t<0||t>=this.children.length)throw new Error("Invalid index");return this.splitview.getViewCachedVisibleSize(t)}removeChild(t,i){if(t<0||t>=this.children.length)throw new Error("Invalid index");return this.splitview.removeView(t,i),this._removeChild(t)}_addChild(t,i){this.children.splice(i,0,t),this.setupChildrenEvents()}_removeChild(t){let[i]=this.children.splice(t,1);return this.setupChildrenEvents(),i}setupChildrenEvents(){this.invalidateCachedSizes(),this._childrenDisposable.dispose(),this._childrenDisposable=new k(q.any(...this.children.map(t=>t.onDidChange))(t=>{this.invalidateCachedSizes(),this._onDidChange.fire({size:t.orthogonalSize})}),...this.children.map((t,i)=>t instanceof Et?t.onDidVisibilityChange(({visible:n})=>{this.setChildVisible(i,n)}):M.NONE))}dispose(){this._childrenDisposable.dispose(),this.splitview.dispose(),this.children.forEach(t=>t.dispose()),super.dispose()}};function st(e,t){if(e instanceof Z)return e;if(e instanceof Y)return st(e.children[t?e.children.length-1:0],t);throw new Error("invalid node")}function Ut(e,t,i){if(e instanceof Y){let n=new Y(e.orientation,e.proportionalLayout,e.styles,t,i,e.disabled,e.margin);for(let o=e.children.length-1;o>=0;o--){let r=e.children[o];n.addChild(Ut(r,r.size,r.orthogonalSize),r.size,0,!0)}return n}else return new Z(e.view,e.orientation,i)}function dt(e,t,i){if(e instanceof Y){let n=new Y(de(e.orientation),e.proportionalLayout,e.styles,t,i,e.disabled,e.margin),o=0;for(let r=e.children.length-1;r>=0;r--){let a=e.children[r],s=a instanceof Y?a.orthogonalSize:a.size,d=e.size===0?0:Math.round(t*s/e.size);o+=d,r===0&&(d+=t-o),n.addChild(dt(a,i,d),d,0,!0)}return n}else return new Z(e.view,de(e.orientation),i)}function Yt(e){let t=e.parentElement;if(!t)throw new Error("Invalid grid element");let i=t.firstElementChild,n=0;for(;i!==e&&i!==t.lastElementChild&&i;)i=i.nextElementSibling,n++;return n}function V(e){let t=e.parentElement;if(!t)throw new Error("Invalid grid element");if(/\bdv-grid-view\b/.test(t.className))return[];let i=Yt(t),n=t.parentElement.parentElement.parentElement;return[...V(n),i]}function Q(e,t,i){if(lt(e,t)===Le(i)){let[n,o]=ae(t),r=o;return(i==="right"||i==="bottom")&&(r+=1),[...n,r]}else{let n=i==="right"||i==="bottom"?1:0;return[...t,n]}}function Le(e){return e==="top"||e==="bottom"?"VERTICAL":"HORIZONTAL"}function lt(e,t){return t.length%2===0?de(e):e}let de=e=>e==="HORIZONTAL"?"VERTICAL":"HORIZONTAL";function Xt(e){return!!e.children}let ht=(e,t)=>{let i=t==="VERTICAL"?e.box.width:e.box.height;if(!Xt(e))return typeof e.cachedVisibleSize=="number"?{type:"leaf",data:e.view.toJSON(),size:e.cachedVisibleSize,visible:!1}:{type:"leaf",data:e.view.toJSON(),size:i};let n=e.children.map(o=>ht(o,de(t)));return typeof e.cachedVisibleSize=="number"?{type:"branch",data:n,size:e.cachedVisibleSize,visible:!1}:{type:"branch",data:n,size:i}};var ct=class{get length(){return this._root?this._root.children.length:0}get orientation(){return this.root.orientation}set orientation(e){if(this.root.orientation===e)return;let{size:t,orthogonalSize:i}=this.root;this.root=dt(this.root,i,t),this.root.layout(t,i)}get width(){return this.root.width}get height(){return this.root.height}get minimumWidth(){return this.root.minimumWidth}get minimumHeight(){return this.root.minimumHeight}get maximumWidth(){return this.root.maximumWidth}get maximumHeight(){return this.root.maximumHeight}get locked(){return this._locked}set locked(e){this._locked=e;let t=[this.root];for(;t.length>0;){let i=t.pop();i instanceof Y&&(i.disabled=e,t.push(...i.children))}}get margin(){return this._margin}set margin(e){this._margin=e,this.root.margin=e}maximizedView(){var e;return(e=this._maximizedNode)===null||e===void 0?void 0:e.leaf.view}hasMaximizedView(){return this._maximizedNode!==void 0}maximizeView(e){var t;let i=V(e.element),[n,o]=this.getNode(i);if(!(o instanceof Z)||((t=this._maximizedNode)===null||t===void 0?void 0:t.leaf)===o)return;this.hasMaximizedView()&&this.exitMaximizedView(),ht(this.getView(),this.orientation);let r=[];function a(s,d){for(let l=0;l<s.children.length;l++){let h=s.children[l];h instanceof Z?h!==d&&(s.isChildVisible(l)?s.setChildVisible(l,!1):r.push(h)):a(h,d)}}a(this.root,o),this._maximizedNode={leaf:o,hiddenOnMaximize:r},this._onDidMaximizedNodeChange.fire({view:o.view,isMaximized:!0})}exitMaximizedView(){if(!this._maximizedNode)return;let e=this._maximizedNode.hiddenOnMaximize;function t(n){for(let o=n.children.length-1;o>=0;o--){let r=n.children[o];r instanceof Z?e.includes(r)||n.setChildVisible(o,!0):t(r)}}t(this.root);let i=this._maximizedNode.leaf;this._maximizedNode=void 0,this._onDidMaximizedNodeChange.fire({view:i.view,isMaximized:!1})}serialize(){let e=this.maximizedView(),t;e&&(t=V(e.element));let i=this._onDidMaximizedNodeChange.pause();try{this.hasMaximizedView()&&this.exitMaximizedView();let n={root:ht(this.getView(),this.orientation),width:this.width,height:this.height,orientation:this.orientation};return t&&(n.maximizedNode={location:t}),e&&this.maximizeView(e),n}finally{i.dispose()}}dispose(){this.disposable.dispose(),this._onDidChange.dispose(),this._onDidMaximizedNodeChange.dispose(),this._onDidViewVisibilityChange.dispose(),this.root.dispose(),this._maximizedNode=void 0,this.element.remove()}clear(){let e=this.root.orientation;this.root=new Y(e,this.proportionalLayout,this.styles,this.root.size,this.root.orthogonalSize,this.locked,this.margin)}deserialize(e,t){let i=e.orientation,n=i==="VERTICAL"?e.height:e.width;if(this._deserialize(e.root,i,t,n),this.layout(e.width,e.height),e.maximizedNode){let o=e.maximizedNode.location,[r,a]=this.getNode(o);if(!(a instanceof Z))return;this.maximizeView(a.view)}}_deserialize(e,t,i,n){this.root=this._deserializeNode(e,t,i,n)}_deserializeNode(e,t,i,n){let o;if(e.type==="branch"){let a=e.data.map(s=>({node:this._deserializeNode(s,de(t),i,e.size),visible:s.visible}));o=new Y(t,this.proportionalLayout,this.styles,e.size,n,this.locked,this.margin,a)}else{let a=i.fromJSON(e);if(typeof e.visible=="boolean"){var r;(r=a.setVisible)===null||r===void 0||r.call(a,e.visible)}o=new Z(a,t,n,e.size)}return o}get root(){return this._root}set root(e){let t=this._root;t&&(t.dispose(),this._maximizedNode=void 0,t.element.remove()),this._root=e,this.element.appendChild(this._root.element),this.disposable.value=this._root.onDidChange(i=>{this._onDidChange.fire(i)})}normalize(){if(!this._root||this._root.children.length!==1)return;let e=this.root,t=e.children[0];if(t instanceof Z)return;e.element.remove();let i=e.removeChild(0);e.dispose(),i.dispose(),this._root=Ut(t,t.size,t.orthogonalSize),this.element.appendChild(this._root.element),this.disposable.value=this._root.onDidChange(n=>{this._onDidChange.fire(n)})}insertOrthogonalSplitviewAtRoot(){if(!this._root)return;let e=this.root;if(e.element.remove(),this._root=new Y(de(e.orientation),this.proportionalLayout,this.styles,this.root.orthogonalSize,this.root.size,this.locked,this.margin),e.children.length!==0)if(e.children.length===1){let t=e.children[0];e.removeChild(0).dispose(),e.dispose(),this._root.addChild(dt(t,t.orthogonalSize,t.size),X.Distribute,0)}else this._root.addChild(e,X.Distribute,0);this.element.appendChild(this._root.element),this.disposable.value=this._root.onDidChange(t=>{this._onDidChange.fire(t)})}next(e){return this.progmaticSelect(e)}previous(e){return this.progmaticSelect(e,!0)}getView(e){let t=e?this.getNode(e)[1]:this.root;return this._getViews(t,this.orientation)}_getViews(e,t,i){let n={height:e.height,width:e.width};if(e instanceof Z)return{box:n,view:e.view,cachedVisibleSize:i};let o=[];for(let r=0;r<e.children.length;r++){let a=e.children[r],s=e.getChildCachedVisibleSize(r);o.push(this._getViews(a,de(t),s))}return{box:n,children:o,cachedVisibleSize:i}}progmaticSelect(e,t=!1){let[i,n]=this.getNode(e);if(!(n instanceof Z))throw new TypeError("invalid location");for(let o=i.length-1;o>-1;o--){let r=i[o],a=e[o]||0;if(t?a-1>-1:a+1<r.children.length)return st(r.children[t?a-1:a+1],t)}return st(this.root,t)}constructor(e,t,i,n,o){this.proportionalLayout=e,this.styles=t,this._locked=!1,this._margin=0,this._maximizedNode=void 0,this.disposable=new H,this._onDidChange=new m,this.onDidChange=this._onDidChange.event,this._onDidViewVisibilityChange=new m,this.onDidViewVisibilityChange=this._onDidViewVisibilityChange.event,this._onDidMaximizedNodeChange=new m,this.onDidMaximizedNodeChange=this._onDidMaximizedNodeChange.event,this.element=document.createElement("div"),this.element.className="dv-grid-view",this._locked=n??!1,this._margin=o??0,this.root=new Y(i,e,t,0,0,this.locked,this.margin)}isViewVisible(e){let[t,i]=ae(e),[,n]=this.getNode(t);if(!(n instanceof Y))throw new TypeError("Invalid from location");return n.isChildVisible(i)}setViewVisible(e,t){this.hasMaximizedView()&&this.exitMaximizedView();let[i,n]=ae(e),[,o]=this.getNode(i);if(!(o instanceof Y))throw new TypeError("Invalid from location");this._onDidViewVisibilityChange.fire(),o.setChildVisible(n,t)}moveView(e,t,i){this.hasMaximizedView()&&this.exitMaximizedView();let[,n]=this.getNode(e);if(!(n instanceof Y))throw new TypeError("Invalid location");n.moveChild(t,i)}addView(e,t,i){this.hasMaximizedView()&&this.exitMaximizedView();let[n,o]=ae(i),[r,a]=this.getNode(n);if(a instanceof Y){let s=new Z(e,de(a.orientation),a.orthogonalSize);a.addChild(s,t,o)}else{let[s,...d]=[...r].reverse(),[l,...h]=[...n].reverse(),c=0,v=s.getChildCachedVisibleSize(l);typeof v=="number"&&(c=X.Invisible(v)),s.removeChild(l).dispose();let p=new Y(a.orientation,this.proportionalLayout,this.styles,a.size,a.orthogonalSize,this.locked,this.margin);s.addChild(p,a.size,l);let u=new Z(a.view,s.orientation,a.size);p.addChild(u,c,0),typeof t!="number"&&t.type==="split"&&(t={type:"split",index:0});let g=new Z(e,s.orientation,a.size);p.addChild(g,t,o)}}remove(e,t){let i=V(e.element);return this.removeView(i,t)}removeView(e,t){this.hasMaximizedView()&&this.exitMaximizedView();let[i,n]=ae(e),[o,r]=this.getNode(i);if(!(r instanceof Y))throw new TypeError("Invalid location");let a=r.children[n];if(!(a instanceof Z))throw new TypeError("Invalid location");if(r.removeChild(n,t),a.dispose(),r.children.length!==1)return a.view;let s=r.children[0];if(o.length===0)return s instanceof Z||(r.removeChild(0,t),this.root=s),a.view;let[d,...l]=[...o].reverse(),[h,...c]=[...i].reverse(),v=r.isChildVisible(0);r.removeChild(0,t);let p=d.children.map((u,g)=>d.getChildSize(g));if(d.removeChild(h,t).dispose(),s instanceof Y){p.splice(h,1,...s.children.map(u=>u.size));for(let u=0;u<s.children.length;u++){let g=s.children[u];d.addChild(g,g.size,h+u)}for(;s.children.length>0;)s.removeChild(0)}else{let u=new Z(s.view,de(s.orientation),s.size),g=v?s.orthogonalSize:X.Invisible(s.orthogonalSize);d.addChild(u,g,h)}s.dispose();for(let u=0;u<p.length;u++)d.resizeChild(u,p[u]);return a.view}layout(e,t){let[i,n]=this.root.orientation==="HORIZONTAL"?[t,e]:[e,t];this.root.layout(i,n)}getNode(e,t=this.root,i=[]){if(e.length===0)return[i,t];if(!(t instanceof Y))throw new TypeError("Invalid location");let[n,...o]=e;if(n<0||n>=t.children.length)throw new Error("Invalid location");let r=t.children[n];return i.push(t),this.getNode(o,r,i)}};let Vn=Object.keys({disableAutoResizing:void 0,proportionalLayout:void 0,orientation:void 0,hideBorders:void 0,className:void 0});var vt=class extends k{get element(){return this._element}get disableResizing(){return this._disableResizing}set disableResizing(e){this._disableResizing=e}constructor(e,t=!1){super(),this._lastWidth=-1,this._lastHeight=-1,this._disableResizing=t,this._element=e,this.addDisposables(_e(this._element,i=>{if(this.isDisposed||this.disableResizing||!this._element.offsetParent||!Wt(this._element))return;let n=Math.round(i.contentRect.width),o=Math.round(i.contentRect.height);n===this._lastWidth&&o===this._lastHeight||(this._lastWidth=n,this._lastHeight=o,this.layout(n,o))}))}};let $n=rt();function ze(e){switch(e){case"left":return"left";case"right":return"right";case"above":return"top";case"below":return"bottom";default:return"center"}}var pt=class extends vt{get id(){return this._id}get size(){return this._groups.size}get groups(){return Array.from(this._groups.values()).map(e=>e.value)}get width(){return this.gridview.width}get height(){return this.gridview.height}get minimumHeight(){return this.gridview.minimumHeight}get maximumHeight(){return this.gridview.maximumHeight}get minimumWidth(){return this.gridview.minimumWidth}get maximumWidth(){return this.gridview.maximumWidth}get activeGroup(){return this._activeGroup}get locked(){return this.gridview.locked}set locked(e){this.gridview.locked=e}constructor(e,t){var i;super(document.createElement("div"),t.disableAutoResizing),this._id=$n.next(),this._groups=new Map,this._onDidRemove=new m,this.onDidRemove=this._onDidRemove.event,this._onDidAdd=new m,this.onDidAdd=this._onDidAdd.event,this._onDidMaximizedChange=new m,this.onDidMaximizedChange=this._onDidMaximizedChange.event,this._onDidActiveChange=new m,this.onDidActiveChange=this._onDidActiveChange.event,this._bufferOnDidLayoutChange=new Lt,this.onDidLayoutChange=this._bufferOnDidLayoutChange.onEvent,this._onDidViewVisibilityChangeMicroTaskQueue=new Lt,this.onDidViewVisibilityChangeMicroTaskQueue=this._onDidViewVisibilityChangeMicroTaskQueue.onEvent,this.element.style.height="100%",this.element.style.width="100%",this._classNames=new Oe(this.element),this._classNames.setClassNames((i=t.className)!==null&&i!==void 0?i:""),e.appendChild(this.element),this.gridview=new ct(!!t.proportionalLayout,t.styles,t.orientation,t.locked,t.margin),this.gridview.locked=!!t.locked,this.element.appendChild(this.gridview.element),this.layout(0,0,!0),this.addDisposables(this.gridview.onDidMaximizedNodeChange(n=>{this._onDidMaximizedChange.fire({panel:n.view,isMaximized:n.isMaximized})}),this.gridview.onDidViewVisibilityChange(()=>this._onDidViewVisibilityChangeMicroTaskQueue.fire()),this.onDidViewVisibilityChangeMicroTaskQueue(()=>{this.forceRelayout()}),M.from(()=>{this.element.remove()}),this.gridview.onDidChange(()=>{this._bufferOnDidLayoutChange.fire()}),q.any(this.onDidAdd,this.onDidRemove,this.onDidActiveChange)(()=>{this._bufferOnDidLayoutChange.fire()}),this._onDidMaximizedChange,this._onDidViewVisibilityChangeMicroTaskQueue,this._bufferOnDidLayoutChange)}setVisible(e,t){this.gridview.setViewVisible(V(e.element),t),this._bufferOnDidLayoutChange.fire()}isVisible(e){return this.gridview.isViewVisible(V(e.element))}updateOptions(e){if(e.proportionalLayout,e.orientation&&(this.gridview.orientation=e.orientation),"styles"in e,"disableAutoResizing"in e){var t;this.disableResizing=(t=e.disableAutoResizing)!==null&&t!==void 0?t:!1}if("locked"in e){var i;this.locked=(i=e.locked)!==null&&i!==void 0?i:!1}if("margin"in e){var n;this.gridview.margin=(n=e.margin)!==null&&n!==void 0?n:0}if("className"in e){var o;this._classNames.setClassNames((o=e.className)!==null&&o!==void 0?o:"")}}maximizeGroup(e){this.gridview.maximizeView(e),this.doSetGroupActive(e)}isMaximizedGroup(e){return this.gridview.maximizedView()===e}exitMaximizedGroup(){this.gridview.exitMaximizedView()}hasMaximizedGroup(){return this.gridview.hasMaximizedView()}doAddGroup(e,t=[0],i,n=this.gridview){n.addView(e,i??X.Distribute,t),this._onDidAdd.fire(e)}doRemoveGroup(e,t){if(!this._groups.has(e.id))throw new Error("invalid operation");let i=this._groups.get(e.id),n=this.gridview.remove(e,X.Distribute);if(i&&!t?.skipDispose&&(i.disposable.dispose(),i.value.dispose(),this._groups.delete(e.id),this._onDidRemove.fire(e)),!t?.skipActive&&this._activeGroup===e){let o=Array.from(this._groups.values());this.doSetGroupActive(o.length>0?o[0].value:void 0)}return n}getPanel(e){var t;return(t=this._groups.get(e))===null||t===void 0?void 0:t.value}doSetGroupActive(e){this._activeGroup!==e&&(this._activeGroup&&this._activeGroup.setActive(!1),e&&e.setActive(!0),this._activeGroup=e,this._onDidActiveChange.fire(e))}removeGroup(e){this.doRemoveGroup(e)}activateNext(e){var t,i;if((t=e)!==null&&t!==void 0||(e={}),!e.group){if(!this.activeGroup)return;e.group=this.activeGroup}let n=V(e.group.element),o=(i=this.gridview.next(n))===null||i===void 0?void 0:i.view;this.doSetGroupActive(o)}activatePrevious(e){var t,i;if((t=e)!==null&&t!==void 0||(e={}),!e.group){if(!this.activeGroup)return;e.group=this.activeGroup}let n=V(e.group.element),o=(i=this.gridview.previous(n))===null||i===void 0?void 0:i.view;this.doSetGroupActive(o)}forceRelayout(){this.layout(this.width,this.height,!0)}layout(e,t,i){(i||e!==this.width||t!==this.height)&&(this.gridview.element.style.height=`${t}px`,this.gridview.element.style.width=`${e}px`,this.gridview.layout(e,t))}dispose(){this._onDidActiveChange.dispose(),this._onDidAdd.dispose(),this._onDidRemove.dispose();for(let e of this.groups)e.dispose();this.gridview.dispose(),super.dispose()}};function Pe(e){"@babel/helpers - typeof";return Pe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Pe(e)}function Nn(e,t){if(Pe(e)!="object"||!e)return e;var i=e[Symbol.toPrimitive];if(i!==void 0){var n=i.call(e,t||"default");if(Pe(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Wn(e){var t=Nn(e,"string");return Pe(t)=="symbol"?t:t+""}function Hn(e,t,i){return(t=Wn(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function Zt(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),i.push.apply(i,n)}return i}function G(e){for(var t=1;t<arguments.length;t++){var i=arguments[t]!=null?arguments[t]:{};t%2?Zt(Object(i),!0).forEach(function(n){Hn(e,n,i[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):Zt(Object(i)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(i,n))})}return e}function Fn(e,t){return e==="center"?`Tab into ${t}`:`Split ${e} of ${t}`}function Bn(e,t){return e==="center"?`docked into ${t}`:`split ${e} of ${t}`}let Re={panelOpened:e=>`${e} opened`,panelClosed:e=>`${e} closed`,groupMaximized:e=>`${e} maximized`,groupRestored:e=>`${e} restored`,groupFloated:e=>`${e} floated`,groupDocked:e=>`${e} docked`,groupPoppedOut:e=>`${e} opened in a new window`,closeTab:e=>`Close ${e}`,closeTabPlain:()=>"Close",movePickTarget:(e,t,i,n)=>`Moving ${e}. Target ${t}, ${i} of ${n}. Enter to choose where, Escape to cancel.`,movePickEdge:(e,t)=>`${Fn(e,t)}. Arrows to change, Enter to confirm, Escape to go back.`,moveCommitted:(e,t,i)=>`${e} ${Bn(i,t)}.`,moveCancelled:()=>"Move cancelled.",moveNotAllowed:()=>"That move is not allowed.",moveFloated:e=>`${e} floated.`};function ut(e){return e?G(G({},Re),e):Re}var Jt=class{get minimumSize(){return this.component.minimumSize}get maximumSize(){return this.component.maximumSize}get width(){return this.component.width}get height(){return this.component.height}get length(){return this.component.length}get orientation(){return this.component.orientation}get panels(){return this.component.panels}get onDidLayoutFromJSON(){return this.component.onDidLayoutFromJSON}get onDidLayoutChange(){return this.component.onDidLayoutChange}get onDidAddView(){return this.component.onDidAddView}get onDidRemoveView(){return this.component.onDidRemoveView}constructor(e){this.component=e}removePanel(e,t){this.component.removePanel(e,t)}focus(){this.component.focus()}getPanel(e){return this.component.getPanel(e)}layout(e,t){return this.component.layout(e,t)}addPanel(e){return this.component.addPanel(e)}movePanel(e,t){this.component.movePanel(e,t)}fromJSON(e){this.component.fromJSON(e)}toJSON(){return this.component.toJSON()}clear(){this.component.clear()}updateOptions(e){this.component.updateOptions(e)}dispose(){this.component.dispose()}},Se=class{get minimumSize(){return this.component.minimumSize}get maximumSize(){return this.component.maximumSize}get width(){return this.component.width}get height(){return this.component.height}get panels(){return this.component.panels}get onDidLayoutChange(){return this.component.onDidLayoutChange}get onDidLayoutFromJSON(){return this.component.onDidLayoutFromJSON}get onDidAddView(){return this.component.onDidAddView}get onDidRemoveView(){return this.component.onDidRemoveView}get onDidDrop(){return this.component.onDidDrop}get onUnhandledDragOver(){return this.component.onUnhandledDragOver}constructor(e){this.component=e}removePanel(e){this.component.removePanel(e)}getPanel(e){return this.component.getPanel(e)}movePanel(e,t){this.component.movePanel(e,t)}focus(){this.component.focus()}layout(e,t){this.component.layout(e,t)}addPanel(e){return this.component.addPanel(e)}fromJSON(e){this.component.fromJSON(e)}toJSON(){return this.component.toJSON()}clear(){this.component.clear()}updateOptions(e){this.component.updateOptions(e)}dispose(){this.component.dispose()}},Kt=class{get width(){return this.component.width}get height(){return this.component.height}get minimumHeight(){return this.component.minimumHeight}get maximumHeight(){return this.component.maximumHeight}get minimumWidth(){return this.component.minimumWidth}get maximumWidth(){return this.component.maximumWidth}get onDidLayoutChange(){return this.component.onDidLayoutChange}get onDidAddPanel(){return this.component.onDidAddGroup}get onDidRemovePanel(){return this.component.onDidRemoveGroup}get onDidActivePanelChange(){return this.component.onDidActiveGroupChange}get onDidLayoutFromJSON(){return this.component.onDidLayoutFromJSON}get panels(){return this.component.groups}get orientation(){return this.component.orientation}set orientation(e){this.component.updateOptions({orientation:e})}constructor(e){this.component=e}focus(){this.component.focus()}layout(e,t,i=!1){this.component.layout(e,t,i)}addPanel(e){return this.component.addPanel(e)}removePanel(e,t){this.component.removePanel(e,t)}movePanel(e,t){this.component.movePanel(e,t)}getPanel(e){return this.component.getPanel(e)}fromJSON(e){return this.component.fromJSON(e)}toJSON(){return this.component.toJSON()}clear(){this.component.clear()}updateOptions(e){this.component.updateOptions(e)}dispose(){this.component.dispose()}},Ve=class{get id(){return this.component.id}get width(){return this.component.width}get height(){return this.component.height}get minimumHeight(){return this.component.minimumHeight}get maximumHeight(){return this.component.maximumHeight}get minimumWidth(){return this.component.minimumWidth}get maximumWidth(){return this.component.maximumWidth}get size(){return this.component.size}get tabGroupColors(){return this.component.tabGroupColorPalette.entries()}get totalPanels(){return this.component.totalPanels}get onDidActiveGroupChange(){return this.component.onDidActiveGroupChange}get onDidAddGroup(){return this.component.onDidAddGroup}get onDidRemoveGroup(){return this.component.onDidRemoveGroup}get onDidActivePanelChange(){return this.component.onDidActivePanelChange}get onDidPanelPinnedChange(){return this.component.onDidPanelPinnedChange}get onDidAddPanel(){return this.component.onDidAddPanel}get onDidRemovePanel(){return this.component.onDidRemovePanel}get onDidMovePanel(){return this.component.onDidMovePanel}get onDidLayoutFromJSON(){return this.component.onDidLayoutFromJSON}get onDidLayoutChange(){return this.component.onDidLayoutChange}get onDidDrop(){return this.component.onDidDrop}get onWillDrop(){return this.component.onWillDrop}get onWillMutateLayout(){return this.component.onWillMutateLayout}get onDidMutateLayout(){return this.component.onDidMutateLayout}get onWillShowOverlay(){return this.component.onWillShowOverlay}get onWillDragGroup(){return this.component.onWillDragGroup}get onWillDragPanel(){return this.component.onWillDragPanel}get onUnhandledDragOver(){return this.component.onUnhandledDragOver}get onDidPopoutGroupSizeChange(){return this.component.onDidPopoutGroupSizeChange}get onDidPopoutGroupPositionChange(){return this.component.onDidPopoutGroupPositionChange}get onDidAddPopoutGroup(){return this.component.onDidAddPopoutGroup}get onDidRemovePopoutGroup(){return this.component.onDidRemovePopoutGroup}get onDidOpenPopoutWindowFail(){return this.component.onDidOpenPopoutWindowFail}getPopouts(){return this.component.getPopouts()}get onDidCreateTabGroup(){return this.component.onDidCreateTabGroup}get onDidDestroyTabGroup(){return this.component.onDidDestroyTabGroup}get onDidAddPanelToTabGroup(){return this.component.onDidAddPanelToTabGroup}get onDidRemovePanelFromTabGroup(){return this.component.onDidRemovePanelFromTabGroup}get onDidTabGroupChange(){return this.component.onDidTabGroupChange}get onDidTabGroupCollapsedChange(){return this.component.onDidTabGroupCollapsedChange}get panels(){return this.component.panels}get groups(){return this.component.groups}adjacentGroupInDirection(e,t){return this.component.adjacentGroupInDirection(e,t)}get activePanel(){return this.component.activePanel}get activeGroup(){return this.component.activeGroup}get messages(){return ut(this.component.options.messages)}constructor(e){this.component=e}focus(){this.component.focus()}getPanel(e){return this.component.getGroupPanel(e)}layout(e,t,i=!1){this.component.layout(e,t,i)}addPanel(e){return this.component.withOrigin("api",()=>this.component.addPanel(e))}removePanel(e){this.component.withOrigin("api",()=>this.component.removePanel(e))}addGroup(e){return this.component.withOrigin("api",()=>this.component.addGroup(e))}closeAllGroups(){return this.component.withOrigin("api",()=>this.component.closeAllGroups())}removeGroup(e){this.component.withOrigin("api",()=>this.component.removeGroup(e))}getGroup(e){return this.component.getPanel(e)}addFloatingGroup(e,t){return this.component.withOrigin("api",()=>this.component.addFloatingGroup(e,t))}fromJSON(e,t){this.component.withOrigin("api",()=>this.component.fromJSON(e,t))}toJSON(){return this.component.toJSON()}clear(){this.component.withOrigin("api",()=>this.component.clear())}undo(){this.component.undo()}redo(){this.component.redo()}get canUndo(){return this.component.canUndo}get canRedo(){return this.component.canRedo}clearHistory(){this.component.clearHistory()}get onDidChangeHistory(){return this.component.onDidChangeHistory}get smartGuidesEnabled(){return this.component.smartGuidesEnabled}setSmartGuidesEnabled(e){this.component.setSmartGuidesEnabled(e)}updateSmartGuidesOptions(e){this.component.updateSmartGuidesOptions(e)}get onDidSnapFloat(){return this.component.onDidSnapFloat}get onDidSnapTogether(){return this.component.onDidSnapTogether}get popoutRestorationPromise(){return this.component.popoutRestorationPromise}activateNext(e){this.component.activateNext(e)}activatePrevious(e){this.component.activatePrevious(e)}moveToNext(e){this.activateNext(e)}moveToPrevious(e){this.activatePrevious(e)}maximizeGroup(e){this.component.withOrigin("api",()=>this.component.maximizeGroup(e.group))}hasMaximizedGroup(){return this.component.hasMaximizedGroup()}exitMaximizedGroup(){this.component.withOrigin("api",()=>this.component.exitMaximizedGroup())}get onDidMaximizedGroupChange(){return this.component.onDidMaximizedGroupChange}addPopoutGroup(e,t){return this.component.withOrigin("api",()=>this.component.addPopoutGroup(e,t))}addEdgeGroup(e,t){return this.component.addEdgeGroup(e,t)}revealEdgeGroupWithData(e,t,i){this.component.revealEdgeGroupWithData(e,t,i)}getEdgeGroup(e){return this.component.getEdgeGroup(e)}setEdgeGroupVisible(e,t){this.component.setEdgeGroupVisible(e,t)}isEdgeGroupVisible(e){return this.component.isEdgeGroupVisible(e)}removeEdgeGroup(e){this.component.removeEdgeGroup(e)}pinEdgeGroup(e){this.component.pinEdgeGroup(e)}autoHideEdgeGroup(e){this.component.autoHideEdgeGroup(e)}peekEdgeGroup(e,t){this.component.peekEdgeGroup(e,t)}updateOptions(e){this.component.updateOptions(e)}_getGroupModel(e){let t=this.component.getPanel(e);if(!t)throw new Error(`dockview: group '${e}' not found`);return t.model}createTabGroup(e){let t=this._getGroupModel(e.groupId);return this.component.withOrigin("api",()=>t.createTabGroup({label:e.label,color:e.color,componentParams:e.componentParams}))}dissolveTabGroup(e){let t=this._getGroupModel(e.groupId);this.component.withOrigin("api",()=>t.dissolveTabGroup(e.tabGroupId))}addPanelToTabGroup(e){let t=this._getGroupModel(e.groupId);this.component.withOrigin("api",()=>t.addPanelToTabGroup(e.tabGroupId,e.panelId,e.index))}removePanelFromTabGroup(e){let t=this._getGroupModel(e.groupId);this.component.withOrigin("api",()=>t.removePanelFromTabGroup(e.panelId))}getTabGroups(e){return this._getGroupModel(e.groupId).getTabGroups()}getTabGroupForPanel(e){return this._getGroupModel(e.groupId).getTabGroupForPanel(e.panelId)}moveTabGroup(e){this._getGroupModel(e.groupId).moveTabGroup(e.tabGroupId,e.index)}dispose(){this.component.dispose()}},jt=class extends k{constructor(e,t){super(),this.element=e,this.callbacks=t,this.target=null,this.registerListeners()}onDragEnter(e){this.target=e.target,this.callbacks.onDragEnter(e)}onDragOver(e){e.preventDefault(),this.callbacks.onDragOver&&this.callbacks.onDragOver(e)}onDragLeave(e){this.target===e.target&&(this.target=null,this.callbacks.onDragLeave(e))}onDragEnd(e){this.target=null,this.callbacks.onDragEnd(e)}onDrop(e){this.callbacks.onDrop(e)}registerListeners(){this.addDisposables(C(this.element,"dragenter",e=>{this.onDragEnter(e)},!0)),this.addDisposables(C(this.element,"dragover",e=>{this.onDragOver(e)},!0)),this.addDisposables(C(this.element,"dragleave",e=>{this.onDragLeave(e)})),this.addDisposables(C(this.element,"dragend",e=>{this.onDragEnd(e)})),this.addDisposables(C(this.element,"drop",e=>{this.onDrop(e)}))}};let Un={value:50,type:"percentage"},Yn=100,Xn=100;function gt(){let e=document.createElement("div");e.className="dv-drop-target-dropzone";let t=document.createElement("div");return t.className="dv-drop-target-selection",e.appendChild(t),{dropzone:e,selection:t}}function qt(e,t,i,n){var o,r,a;let s=(o=n?.smallWidthBoundary)!==null&&o!==void 0?o:Yn,d=(r=n?.smallHeightBoundary)!==null&&r!==void 0?r:Xn,l=t<s,h=i<d,c=e==="left",v=e==="right",p=e==="top",u=e==="bottom",g=!l&&v,b=!l&&c,D=!h&&p,w=!h&&u,_=1,S=(a=n?.size)!==null&&a!==void 0?a:Un;return S.type==="percentage"?_=N(S.value,0,100)/100:((g||b)&&(_=N(0,S.value,t)/t),(D||w)&&(_=N(0,S.value,i)/i)),{isSmallX:l,isSmallY:h,isLeft:c,isRight:v,isTop:p,isBottom:u,rightClass:g,leftClass:b,topClass:D,bottomClass:w,size:_}}function Qt(e,t,i,n,o){let r=qt(t,i,n,o),{rightClass:a,leftClass:s,topClass:d,bottomClass:l,size:h}=r,c={top:"0px",left:"0px",width:"100%",height:"100%"};a?(c.left=`${100*(1-h)}%`,c.width=`${100*h}%`):s?c.width=`${100*h}%`:d?c.height=`${100*h}%`:l&&(c.top=`${100*(1-h)}%`,c.height=`${100*h}%`),r.isSmallX&&r.isLeft&&(c.width="4px"),r.isSmallX&&r.isRight&&(c.left=`${i-4}px`,c.width="4px"),r.isSmallY&&r.isTop&&(c.height="4px"),r.isSmallY&&r.isBottom&&(c.top=`${n-4}px`,c.height="4px"),e.style.top=c.top,e.style.left=c.left,e.style.width=c.width,e.style.height=c.height,e.style.visibility="visible",(!e.style.transform||e.style.transform==="")&&(e.style.transform="translate3d(0, 0, 0)");let v=r.isSmallX&&(r.isLeft||r.isRight)||r.isSmallY&&(r.isTop||r.isBottom);x(e,"dv-drop-target-small-vertical",r.isSmallY),x(e,"dv-drop-target-small-horizontal",r.isSmallX),x(e,"dv-drop-target-selection-line",v),x(e,"dv-drop-target-left",r.isLeft),x(e,"dv-drop-target-right",r.isRight),x(e,"dv-drop-target-top",r.isTop),x(e,"dv-drop-target-bottom",r.isBottom),x(e,"dv-drop-target-center",t==="center")}function Zn(e,t){let i=`${Math.round(t.top)}px`,n=`${Math.round(t.left)}px`,o=`${Math.round(t.width)}px`,r=`${Math.round(t.height)}px`;return e.style.top!==i||e.style.left!==n||e.style.width!==o||e.style.height!==r}function Jn(e,t){e.style.top=`${Math.round(t.top)}px`,e.style.left=`${Math.round(t.left)}px`,e.style.width=`${Math.round(t.width)}px`,e.style.height=`${Math.round(t.height)}px`,e.style.visibility="visible",(!e.style.transform||e.style.transform==="")&&(e.style.transform="translate3d(0, 0, 0)")}function ei(e){let t=qt(e.quadrant,e.width,e.height,e.overlayModel),{rightClass:i,leftClass:n,topClass:o,bottomClass:r,size:a}=t,s=e.outlineElement.getBoundingClientRect(),d=e.targetModel.getElements(void 0,e.outlineElement),l=d.root,h=d.overlay,c=l.getBoundingClientRect(),v=s.top-c.top,p=s.left-c.left,u={top:v,left:p,width:e.width,height:e.height};return i?(u.left=p+e.width*(1-a),u.width=e.width*a):n?u.width=e.width*a:o?u.height=e.height*a:r&&(u.top=v+e.height*(1-a),u.height=e.height*a),t.isSmallX&&t.isLeft&&(u.width=4),t.isSmallX&&t.isRight&&(u.left=p+e.width-4,u.width=4),t.isSmallY&&t.isTop&&(u.height=4),t.isSmallY&&t.isBottom&&(u.top=v+e.height-4,u.height=4),Zn(h,u)?(Jn(h,u),h.className=`dv-drop-target-anchor${e.className?` ${e.className}`:""}`,x(h,"dv-drop-target-left",t.isLeft),x(h,"dv-drop-target-right",t.isRight),x(h,"dv-drop-target-top",t.isTop),x(h,"dv-drop-target-bottom",t.isBottom),x(h,"dv-drop-target-anchor-line",t.isSmallX&&(t.isLeft||t.isRight)||t.isSmallY&&(t.isTop||t.isBottom)),x(h,"dv-drop-target-center",e.quadrant==="center"),d.changed&&(x(h,"dv-drop-target-anchor-container-changed",!0),setTimeout(()=>{x(h,"dv-drop-target-anchor-container-changed",!1)},10)),{boundsChanged:!0,targetChanged:d.changed}):{boundsChanged:!1,targetChanged:d.changed}}var ti=class extends qe{get nativeEvent(){return this.options.nativeEvent}get position(){return this.options.position}get edge(){return!!this.options.edge}get edgeGroup(){return!!this.options.edgeGroup}constructor(e){super(),this.options=e}};function mt(e){switch(e){case"above":return"top";case"below":return"bottom";case"left":return"left";case"right":return"right";case"within":return"center";default:throw new Error(`invalid direction '${e}'`)}}function ii(e){switch(e){case"top":return"above";case"bottom":return"below";case"left":return"left";case"right":return"right";case"center":return"within";default:throw new Error(`invalid position '${e}'`)}}let Kn={value:20,type:"percentage"};var bt=class Ie extends k{get disabled(){return this._disabled}set disabled(t){this._disabled=t}get state(){return this._state}constructor(t,i){super(),this.element=t,this.options=i,this._edge=!1,this._onDrop=new m,this.onDrop=this._onDrop.event,this._onWillShowOverlay=new m,this.onWillShowOverlay=this._onWillShowOverlay.event,this._disabled=!1,this._acceptedTargetZonesSet=new Set(this.options.acceptedTargetZones),this.dnd=new jt(this.element,{onDragEnter:()=>{var n,o;(n=(o=this.options).getOverrideTarget)===null||n===void 0||(n=n.call(o))===null||n===void 0||n.getElements()},onDragOver:n=>{var o,r,a,s,d,l,h;if(this._disabled){this.clearOwnOverlay();return}Ie.ACTUAL_TARGET=this;let c=(o=(r=this.options).getOverrideTarget)===null||o===void 0?void 0:o.call(r);if(this._acceptedTargetZonesSet.size===0){this.clearOwnOverlay();return}let v=(a=(s=(d=this.options).getOverlayOutline)===null||s===void 0?void 0:s.call(d))!==null&&a!==void 0?a:this.element,p=v.offsetWidth,u=v.offsetHeight;if(p===0||u===0)return;let g=v.getBoundingClientRect(),b=((l=n.clientX)!==null&&l!==void 0?l:0)-g.left,D=((h=n.clientY)!==null&&h!==void 0?h:0)-g.top,w=this.resolvePosition(b,D,p,u,n);if(this.isAlreadyUsed(n)){this.removeDropTarget();return}if(w===null){this.clearOwnOverlay();return}let _=w.position;if(!this.options.canDisplayOverlay(n,_)){this.clearOwnOverlay();return}let S=new ti({nativeEvent:n,position:_,edge:w.edge,edgeGroup:w.edgeGroup});if(this._onWillShowOverlay.fire(S),S.defaultPrevented){this.clearOwnOverlay();return}if(this.markAsUsed(n),w.edge){this.clearOwnOverlay(),this._state=_,this._edge=!0;return}if(this._edge=!1,!c){if(!this.targetElement){let T=gt();this.targetElement=T.dropzone,this.overlayElement=T.selection,this._state="center",v.classList.add("dv-drop-target"),v.append(this.targetElement)}}this.toggleClasses(_,p,u),this._state=_},onDragLeave:()=>{var n,o;let r=(n=(o=this.options).getOverrideTarget)===null||n===void 0?void 0:n.call(o);if(r){var a;this._state=void 0,this._edge=!1,(a=r.scheduleClear)===null||a===void 0||a.call(r);return}this.removeDropTarget()},onDragEnd:n=>{var o,r;let a=(o=(r=this.options).getOverrideTarget)===null||o===void 0?void 0:o.call(r);a&&Ie.ACTUAL_TARGET===this&&this._state&&(n.stopPropagation(),this._onDrop.fire({position:this._state,nativeEvent:n,edge:this._edge})),this.removeDropTarget(),a?.clear()},onDrop:n=>{var o,r;n.preventDefault();let a=this._state,s=this._edge;this.removeDropTarget(),(o=(r=this.options).getOverrideTarget)===null||o===void 0||(o=o.call(r))===null||o===void 0||o.clear(),a&&(n.stopPropagation(),this._onDrop.fire({position:a,nativeEvent:n,edge:s}))}}),this.addDisposables(this._onDrop,this._onWillShowOverlay,this.dnd)}setTargetZones(t){this._acceptedTargetZonesSet=new Set(t)}setOverlayModel(t){this.options.overlayModel=t}dispose(){this.removeDropTarget(),super.dispose()}markAsUsed(t){t[Ie.USED_EVENT_ID]=!0}isAlreadyUsed(t){let i=t[Ie.USED_EVENT_ID];return typeof i=="boolean"&&i}toggleClasses(t,i,n){var o,r;let a=(o=(r=this.options).getOverrideTarget)===null||o===void 0?void 0:o.call(r);if(a){var s,d,l;ei({outlineElement:(s=(d=(l=this.options).getOverlayOutline)===null||d===void 0?void 0:d.call(l))!==null&&s!==void 0?s:this.element,targetModel:a,quadrant:t,width:i,height:n,overlayModel:this.options.overlayModel,className:this.options.className});return}this.overlayElement&&Qt(this.overlayElement,t,i,n,this.options.overlayModel)}resolvePosition(t,i,n,o,r){var a,s;let d=(a=(s=this.options).getPositionResolver)===null||a===void 0?void 0:a.call(s);if(d){let h=d.resolve({x:t,y:i,width:n,height:o,zones:this._acceptedTargetZonesSet,event:r});return h?{position:h.position,edge:!!h.edge,edgeGroup:!!h.edgeGroup}:null}let l=this.calculateQuadrant(this._acceptedTargetZonesSet,t,i,n,o);return l?{position:l,edge:!1,edgeGroup:!1}:null}calculateQuadrant(t,i,n,o,r){var a,s;let d=(a=(s=this.options.overlayModel)===null||s===void 0?void 0:s.activationSize)!==null&&a!==void 0?a:Kn;return d.type==="percentage"?ni(t,i,n,o,r,d.value):oi(t,i,n,o,r,d.value)}clearOwnOverlay(){let t=this._state!==void 0;if(this.removeDropTarget(),t){var i,n;(i=(n=this.options).getOverrideTarget)===null||i===void 0||(i=i.call(n))===null||i===void 0||i.clear()}}removeDropTarget(){if(this._state=void 0,this._edge=!1,this.targetElement){var t;(t=this.targetElement.parentElement)===null||t===void 0||t.classList.remove("dv-drop-target"),this.targetElement.remove(),this.targetElement=void 0,this.overlayElement=void 0}}showOverlay(t){var i,n,o,r,a;let s=(i=(n=this.options).getOverrideTarget)===null||i===void 0?void 0:i.call(n),d=(o=(r=(a=this.options).getOverlayOutline)===null||r===void 0?void 0:r.call(a))!==null&&o!==void 0?o:this.element,l=d.offsetWidth,h=d.offsetHeight;if(!s&&!this.targetElement){let c=gt();this.targetElement=c.dropzone,this.overlayElement=c.selection,d.classList.add("dv-drop-target"),d.append(this.targetElement)}this.toggleClasses(t,l,h),this._state=t}clearOverlay(){var t,i;this.removeDropTarget(),(t=(i=this.options).getOverrideTarget)===null||t===void 0||(t=t.call(i))===null||t===void 0||t.clear(),this._state=void 0}};bt.USED_EVENT_ID="__dockview_droptarget_event_is_used__";function ni(e,t,i,n,o,r){let a=100*t/n,s=100*i/o;return e.has("left")&&a<r?"left":e.has("right")&&a>100-r?"right":e.has("top")&&s<r?"top":e.has("bottom")&&s>100-r?"bottom":e.has("center")?"center":null}function oi(e,t,i,n,o,r){return e.has("left")&&t<r?"left":e.has("right")&&t>n-r?"right":e.has("top")&&i<r?"top":e.has("bottom")&&i>o-r?"bottom":e.has("center")?"center":null}function jn(e,t,i){var n,o,r;re(t,"dv-dragged"),t.style.top="-9999px",((n=i?.ownerDocument)!==null&&n!==void 0?n:document).body.appendChild(t),e.setDragImage(t,(o=i?.x)!==null&&o!==void 0?o:0,(r=i?.y)!==null&&r!==void 0?r:0),setTimeout(()=>{oe(t,"dv-dragged"),t.remove()},0)}var $e=class Ae extends k{static getInstance(){var t;return(t=Ae._instance)!==null&&t!==void 0||(Ae._instance=new Ae),Ae._instance}constructor(){super(),this._targets=new Set,this._targetByElement=new Map,this._onDragStart=new m,this.onDragStart=this._onDragStart.event,this._onDragMove=new m,this.onDragMove=this._onDragMove.event,this._onDragEnd=new m,this.onDragEnd=this._onDragEnd.event,this.addDisposables(this._onDragStart,this._onDragMove,this._onDragEnd)}get active(){return this._active}registerTarget(t){return this._targets.add(t),this._targetByElement.set(t.element,t),{dispose:()=>{this._targets.delete(t),this._targetByElement.get(t.element)===t&&this._targetByElement.delete(t.element),this._currentTarget===t&&(this._currentTarget=void 0)}}}beginDrag(t){var i,n,o;this._active&&this.cancel();let{pointerEvent:r,source:a}=t,s=t.getData();this._active={pointerId:r.pointerId,startX:r.clientX,startY:r.clientY,source:a},this._lastPointerEvent=r,this._onDragMoveCallback=t.onDragMove,this._onDragEndCallback=t.onDragEnd,this._dataDisposable=s,this._ghost=t.ghost,this._iframeShield=Ge((i=a.ownerDocument)!==null&&i!==void 0?i:document);let d={clientX:r.clientX,clientY:r.clientY,pointerEvent:r};this._onDragStart.fire(d);let l=(n=(o=a.ownerDocument)===null||o===void 0?void 0:o.defaultView)!==null&&n!==void 0?n:globalThis.window;this._moveListener=C(l,"pointermove",h=>{var c;h.pointerId===((c=this._active)===null||c===void 0?void 0:c.pointerId)&&this._handleMove(h)}),this._upListener=C(l,"pointerup",h=>{var c;h.pointerId===((c=this._active)===null||c===void 0?void 0:c.pointerId)&&this._handleEnd(h,!0)}),this._cancelListener=C(l,"pointercancel",h=>{var c;h.pointerId===((c=this._active)===null||c===void 0?void 0:c.pointerId)&&this._handleEnd(h,!1)})}cancel(){var t,i;if(!this._active)return;let n=this._onDragEndCallback,o=this._lastPointerEvent;if((t=this._currentTarget)===null||t===void 0||t.handleDragLeave(),this._teardown(),(i=this._dataDisposable)===null||i===void 0||i.dispose(),this._dataDisposable=void 0,o){let r={clientX:o.clientX,clientY:o.clientY,pointerEvent:o};n?.(r,!1),this._onDragEnd.fire(r)}}_findTargetUnder(t,i){var n,o;let r=((n=(o=this._active)===null||o===void 0?void 0:o.source.ownerDocument)!==null&&n!==void 0?n:document).elementsFromPoint(t,i);for(let s of r){let d=s;for(;d;){var a;let l=this._targetByElement.get(d);if(l&&!(!((a=l.isHitTestTransparent)===null||a===void 0)&&a.call(l)))return l;d=d.parentElement}}}_handleMove(t){var i,n;this._lastPointerEvent=t,(i=this._ghost)===null||i===void 0||i.update(t.clientX,t.clientY);let o={clientX:t.clientX,clientY:t.clientY,pointerEvent:t},r=this._findTargetUnder(t.clientX,t.clientY);if(r!==this._currentTarget){var a;(a=this._currentTarget)===null||a===void 0||a.handleDragLeave(),this._currentTarget=r}r&&r.handleDragOver(o),(n=this._onDragMoveCallback)===null||n===void 0||n.call(this,o),this._onDragMove.fire(o)}_handleEnd(t,i){let n={clientX:t.clientX,clientY:t.clientY,pointerEvent:t};if(i&&this._currentTarget)this._currentTarget.handleDrop(n);else{var o;(o=this._currentTarget)===null||o===void 0||o.handleDragLeave()}let r=this._onDragEndCallback,a=this._dataDisposable;this._teardown(),this._dataDisposable=void 0,setTimeout(()=>a?.dispose(),0),r?.(n,i),this._onDragEnd.fire(n)}_teardown(){var t,i,n,o,r;this._currentTarget=void 0,this._active=void 0,this._lastPointerEvent=void 0,this._onDragMoveCallback=void 0,this._onDragEndCallback=void 0,(t=this._ghost)===null||t===void 0||t.dispose(),this._ghost=void 0,(i=this._iframeShield)===null||i===void 0||i.release(),this._iframeShield=void 0,(n=this._moveListener)===null||n===void 0||n.dispose(),(o=this._upListener)===null||o===void 0||o.dispose(),(r=this._cancelListener)===null||r===void 0||r.dispose(),this._moveListener=void 0,this._upListener=void 0,this._cancelListener=void 0}};let qn={value:20,type:"percentage"};var Qn=class extends k{get disabled(){return this._disabled}set disabled(e){this._disabled=e,e&&this._removeOverlay()}get state(){return this._state}constructor(e,t){super(),this.element=e,this.options=t,this._edge=!1,this._onDrop=new m,this.onDrop=this._onDrop.event,this._onWillShowOverlay=new m,this.onWillShowOverlay=this._onWillShowOverlay.event,this._disabled=!1,this._acceptedTargetZonesSet=new Set(t.acceptedTargetZones);let i={element:this.element,handleDragOver:n=>this._onDragOver(n),handleDragLeave:()=>this._onDragLeave(),handleDrop:n=>this._onDropEvent(n),isHitTestTransparent:t.isHitTestTransparent};this.addDisposables(this._onDrop,this._onWillShowOverlay,$e.getInstance().registerTarget(i))}clearOverlay(){this._clearOwnOverlay()}setTargetZones(e){this._acceptedTargetZonesSet=new Set(e)}setOverlayModel(e){this.options.overlayModel=e}dispose(){this._removeOverlay(),super.dispose()}_onDragOver(e){var t,i,n,o,r;if(this._disabled){this._clearOwnOverlay();return}let a=(t=(i=this.options).getOverrideTarget)===null||t===void 0?void 0:t.call(i);if(this._acceptedTargetZonesSet.size===0){this._clearOwnOverlay();return}let s=(n=(o=(r=this.options).getOverlayOutline)===null||o===void 0?void 0:o.call(r))!==null&&n!==void 0?n:this.element,d=s.offsetWidth,l=s.offsetHeight;if(d===0||l===0)return;let h=s.getBoundingClientRect(),c=e.clientX-h.left,v=e.clientY-h.top,p=this._resolvePosition(c,v,d,l,e.pointerEvent);if(p===null){this._clearOwnOverlay();return}let u=p.position;if(!this.options.canDisplayOverlay(e.pointerEvent,u)){this._clearOwnOverlay();return}let g=new ti({nativeEvent:e.pointerEvent,position:u,edge:p.edge});if(this._onWillShowOverlay.fire(g),g.defaultPrevented){this._clearOwnOverlay();return}if(p.edge){this._clearOwnOverlay(),this._state=u,this._edge=!0;return}if(this._edge=!1,a){ei({outlineElement:s,targetModel:a,quadrant:u,width:d,height:l,overlayModel:this.options.overlayModel,className:this.options.className}),this._state=u;return}if(!this._targetElement){let b=gt();this._targetElement=b.dropzone,this._overlayElement=b.selection,this._state="center",this.element.classList.add("dv-drop-target"),this.element.append(this._targetElement)}this._overlayElement&&Qt(this._overlayElement,u,d,l,this.options.overlayModel),this._state=u}_onDragLeave(){var e,t;let i=(e=(t=this.options).getOverrideTarget)===null||e===void 0?void 0:e.call(t);if(i){this._state=void 0,i.clear();return}this._removeOverlay()}_onDropEvent(e){var t,i;let n=this._state,o=this._edge,r=(t=(i=this.options).getOverrideTarget)===null||t===void 0?void 0:t.call(i);this._removeOverlay(),r?.clear(),n&&this._onDrop.fire({position:n,nativeEvent:e.pointerEvent,edge:o})}_resolvePosition(e,t,i,n,o){var r,a;let s=(r=(a=this.options).getPositionResolver)===null||r===void 0?void 0:r.call(a);if(s){let l=s.resolve({x:e,y:t,width:i,height:n,zones:this._acceptedTargetZonesSet,event:o});return l?{position:l.position,edge:!!l.edge}:null}let d=this._calculateQuadrant(e,t,i,n);return d?{position:d,edge:!1}:null}_calculateQuadrant(e,t,i,n){var o,r;let a=(o=(r=this.options.overlayModel)===null||r===void 0?void 0:r.activationSize)!==null&&o!==void 0?o:qn;return a.type==="percentage"?ni(this._acceptedTargetZonesSet,e,t,i,n,a.value):oi(this._acceptedTargetZonesSet,e,t,i,n,a.value)}_clearOwnOverlay(){let e=this._state!==void 0;if(this._removeOverlay(),e){var t,i;(t=(i=this.options).getOverrideTarget)===null||t===void 0||(t=t.call(i))===null||t===void 0||t.clear()}}_removeOverlay(){if(this._edge=!1,this._targetElement){var e;this._state=void 0,(e=this._targetElement.parentElement)===null||e===void 0||e.classList.remove("dv-drop-target"),this._targetElement.remove(),this._targetElement=void 0,this._overlayElement=void 0}else this._state=void 0}};let eo=5,to=250,io=8;var no=class extends k{constructor(e,t){var i;super(),this.element=e,this.options=t,this._disabled=!1,this._armed=!1,this._startX=0,this._startY=0,this._touchOnly=(i=t.touchOnly)!==null&&i!==void 0?i:!0,this.addDisposables(C(this.element,"pointerdown",n=>{this._onPointerDown(n)}))}setDisabled(e){this._disabled=e,e&&this._cancelPending()}setTouchOnly(e){this._touchOnly!==e&&(this._touchOnly=e,e&&this._cancelPending())}_shouldHandle(e){var t,i;return!(this._disabled||this._touchOnly&&e.pointerType!=="touch"&&e.pointerType!=="pen"||!((t=(i=this.options).isCancelled)===null||t===void 0)&&t.call(i,e))}_onPointerDown(e){var t,i,n,o,r;if(!this._shouldHandle(e))return;this._cancelPending(),this._pendingPointerId=e.pointerId,this._startX=e.clientX,this._startY=e.clientY,this._startEvent=e;let a=e.pointerType==="touch"||e.pointerType==="pen",s=this.options.touchInitiationDelay,d=(t=typeof s=="function"?s():s)!==null&&t!==void 0?t:to;this._armed=!a||d<=0,a&&d>0&&Number.isFinite(d)&&(this._armTimer=setTimeout(()=>{this._armTimer=void 0,this._armed=!0},d));let l=(i=this.options.threshold)!==null&&i!==void 0?i:eo,h=this.options.pressTolerance,c=(n=typeof h=="function"?h():h)!==null&&n!==void 0?n:io,v=(o=(r=this.element.ownerDocument)===null||r===void 0?void 0:r.defaultView)!==null&&o!==void 0?o:globalThis.window;this._pendingMoveListener=C(v,"pointermove",p=>{if(p.pointerId!==this._pendingPointerId)return;let u=p.clientX-this._startX,g=p.clientY-this._startY,b=Math.hypot(u,g);if(this._armed){b>=l&&this._beginDrag(p);return}b>c&&this._beginDrag(p)}),this._pendingUpListener=C(v,"pointerup",p=>{p.pointerId===this._pendingPointerId&&this._cancelPending()}),this._pendingCancelListener=C(v,"pointercancel",p=>{p.pointerId===this._pendingPointerId&&this._cancelPending()})}cancelPending(){this._cancelPending()}_cancelPending(){var e,t,i;this._pendingPointerId=void 0,this._armTimer!==void 0&&(clearTimeout(this._armTimer),this._armTimer=void 0),this._armed=!1,(e=this._pendingMoveListener)===null||e===void 0||e.dispose(),(t=this._pendingUpListener)===null||t===void 0||t.dispose(),(i=this._pendingCancelListener)===null||i===void 0||i.dispose(),this._pendingMoveListener=void 0,this._pendingUpListener=void 0,this._pendingCancelListener=void 0,this._startEvent=void 0}_beginDrag(e){var t,i,n,o,r;let a=(t=this._startEvent)!==null&&t!==void 0?t:e;this._cancelPending(),(i=(n=this.options).onDragStart)===null||i===void 0||i.call(n,a);let s=(o=(r=this.options).createGhost)===null||o===void 0?void 0:o.call(r,a);$e.getInstance().beginDrag({pointerEvent:e,source:this.element,getData:()=>this.options.getData(a),ghost:s,onDragMove:this.options.onDragMove,onDragEnd:this.options.onDragEnd})}dispose(){this._cancelPending(),super.dispose()}},oo=class{constructor(e){var t,i,n,o,r;this._disposed=!1,this.element=e.element,this.offsetX=(t=e.offsetX)!==null&&t!==void 0?t:0,this.offsetY=(i=e.offsetY)!==null&&i!==void 0?i:0,this.element.style.position="fixed",this.element.style.left="0px",this.element.style.top="0px",this.element.style.pointerEvents="none",this.element.style.zIndex="99999",this.element.style.opacity=String((n=e.opacity)!==null&&n!==void 0?n:.8),this.element.style.willChange="transform",this.element.style.transform=`translate3d(${e.initialX-this.offsetX}px, ${e.initialY-this.offsetY}px, 0)`,((o=(r=e.owner)===null||r===void 0?void 0:r.ownerDocument)!==null&&o!==void 0?o:document).body.appendChild(this.element)}update(e,t){this._disposed||(this.element.style.transform=`translate3d(${e-this.offsetX}px, ${t-this.offsetY}px, 0)`)}dispose(){this._disposed||(this._disposed=!0,this.element.remove())}},ro=class extends k{constructor(e,t){super(),this.el=e,this.opts=t,this._dataDisposable=new H,this._pointerEventsDisposable=new H,this._disabled=!!t.disabled,this.addDisposables(this._dataDisposable,this._pointerEventsDisposable,C(this.el,"dragstart",i=>{var n,o,r,a,s,d,l;if(i.defaultPrevented||this._disabled||!((n=(o=this.opts).isCancelled)===null||n===void 0)&&n.call(o,i)){i.preventDefault();return}let h=Ge((r=this.el.ownerDocument)!==null&&r!==void 0?r:document);this._pointerEventsDisposable.value={dispose:()=>h.release()},this.el.classList.add("dv-dragged"),setTimeout(()=>this.el.classList.remove("dv-dragged"),0),this._dataDisposable.value=this.opts.getData(i);let c=(a=(s=this.opts).createGhost)===null||a===void 0?void 0:a.call(s,i);if(c&&i.dataTransfer){var v,p,u;if(jn(i.dataTransfer,c.element,{x:(v=c.offsetX)!==null&&v!==void 0?v:0,y:(p=c.offsetY)!==null&&p!==void 0?p:0,ownerDocument:(u=this.el.ownerDocument)!==null&&u!==void 0?u:void 0}),c.dispose){let g=c.dispose;setTimeout(()=>g(),0)}}i.dataTransfer&&(i.dataTransfer.effectAllowed="move",i.dataTransfer.items.length===0&&i.dataTransfer.setData("text/plain","")),(d=(l=this.opts).onDragStart)===null||d===void 0||d.call(l,i)}),C(this.el,"dragend",i=>{var n,o;this._pointerEventsDisposable.dispose(),setTimeout(()=>this._dataDisposable.dispose(),0),(n=(o=this.opts).onDragEnd)===null||n===void 0||n.call(o,i)}))}setDisabled(e){this._disabled=e}setTouchOnly(e){}cancelPending(){}},ao=class{constructor(){this.kind="html5"}createDropTarget(e,t){return new bt(e,t)}createDragSource(e,t){return new ro(e,t)}},so=class{constructor(){this.kind="pointer"}createDropTarget(e,t){return new Qn(e,t)}createDragSource(e,t){let i=t.createGhost?o=>{let r=t.createGhost(o);if(!r)return;let a=new oo({element:r.element,initialX:o.clientX,initialY:o.clientY,offsetX:r.offsetX,offsetY:r.offsetY,owner:e});if(r.dispose){let s=a.dispose.bind(a),d=r.dispose;a.dispose=()=>{s(),d()}}return a}:void 0,n=new no(e,{getData:t.getData,isCancelled:t.isCancelled,onDragStart:t.onDragStart,onDragEnd:t.onDragEnd?o=>t.onDragEnd(o.pointerEvent):void 0,createGhost:i,touchOnly:t.touchOnly,touchInitiationDelay:t.touchInitiationDelay,pressTolerance:t.pressTolerance,threshold:t.threshold});return t.disabled&&n.setDisabled(!0),n}};let ge=new ao,le=new so,lo=Object.keys({disableAutoResizing:void 0,disableDnd:void 0,className:void 0});var ri=class extends Ot{constructor(e,t,i,n){super(),this.nativeEvent=e,this.position=t,this.getData=i,this.panel=n}},ai=class extends qe{constructor(){super()}},si=class extends k{get isFocused(){return this._isFocused}get isActive(){return this._isActive}get isVisible(){return this._isVisible}get width(){return this._width}get height(){return this._height}constructor(e,t){super(),this.id=e,this.component=t,this._isFocused=!1,this._isActive=!1,this._isVisible=!0,this._width=0,this._height=0,this._parameters={},this.panelUpdatesDisposable=new H,this._onDidDimensionChange=new m,this.onDidDimensionsChange=this._onDidDimensionChange.event,this._onDidChangeFocus=new m,this.onDidFocusChange=this._onDidChangeFocus.event,this._onWillFocus=new m,this.onWillFocus=this._onWillFocus.event,this._onDidVisibilityChange=new m,this.onDidVisibilityChange=this._onDidVisibilityChange.event,this._onWillVisibilityChange=new m,this.onWillVisibilityChange=this._onWillVisibilityChange.event,this._onDidActiveChange=new m,this.onDidActiveChange=this._onDidActiveChange.event,this._onActiveChange=new m,this.onActiveChange=this._onActiveChange.event,this._onDidParametersChange=new m,this.onDidParametersChange=this._onDidParametersChange.event,this.addDisposables(this.onDidFocusChange(i=>{this._isFocused=i.isFocused}),this.onDidActiveChange(i=>{this._isActive=i.isActive}),this.onDidVisibilityChange(i=>{this._isVisible=i.isVisible}),this.onDidDimensionsChange(i=>{this._width=i.width,this._height=i.height}),this.panelUpdatesDisposable,this._onDidDimensionChange,this._onDidChangeFocus,this._onDidVisibilityChange,this._onDidActiveChange,this._onWillFocus,this._onActiveChange,this._onWillFocus,this._onWillVisibilityChange,this._onDidParametersChange)}getParameters(){return this._parameters}initialize(e){this.panelUpdatesDisposable.value=this._onDidParametersChange.event(t=>{this._parameters=t,e.update({params:t})})}setVisible(e){this._onWillVisibilityChange.fire({isVisible:e})}setActive(){this._onActiveChange.fire()}updateParameters(e){this._onDidParametersChange.fire(e)}},di=class extends si{constructor(e,t){super(e,t),this._onDidConstraintsChangeInternal=new m,this.onDidConstraintsChangeInternal=this._onDidConstraintsChangeInternal.event,this._onDidConstraintsChange=new m({replay:!0}),this.onDidConstraintsChange=this._onDidConstraintsChange.event,this._onDidSizeChange=new m,this.onDidSizeChange=this._onDidSizeChange.event,this.addDisposables(this._onDidConstraintsChangeInternal,this._onDidConstraintsChange,this._onDidSizeChange)}setConstraints(e){this._onDidConstraintsChangeInternal.fire(e)}setSize(e){this._onDidSizeChange.fire(e)}},ho=class extends di{set pane(e){this._pane=e}constructor(e,t){super(e,t),this._onDidExpansionChange=new m({replay:!0}),this.onDidExpansionChange=this._onDidExpansionChange.event,this._onMouseEnter=new m({}),this.onMouseEnter=this._onMouseEnter.event,this._onMouseLeave=new m({}),this.onMouseLeave=this._onMouseLeave.event,this.addDisposables(this._onDidExpansionChange,this._onMouseEnter,this._onMouseLeave)}setExpanded(e){var t;(t=this._pane)===null||t===void 0||t.setExpanded(e)}get isExpanded(){var e;return!!(!((e=this._pane)===null||e===void 0)&&e.isExpanded())}},ft=class extends k{get element(){return this._element}get width(){return this._width}get height(){return this._height}get params(){var e;return(e=this._params)===null||e===void 0?void 0:e.params}constructor(e,t,i){super(),this.id=e,this.component=t,this.api=i,this._height=0,this._width=0,this._element=document.createElement("div"),this._element.tabIndex=-1,this._element.style.outline="none",this._element.style.height="100%",this._element.style.width="100%",this._element.style.overflow="hidden";let n=Rt(this._element);this.addDisposables(this.api,n.onDidFocus(()=>{this.api._onDidChangeFocus.fire({isFocused:!0})}),n.onDidBlur(()=>{this.api._onDidChangeFocus.fire({isFocused:!1})}),n)}focus(){let e=new ai;this.api._onWillFocus.fire(e),!e.defaultPrevented&&this._element.focus()}layout(e,t){this._width=e,this._height=t,this.api._onDidDimensionChange.fire({width:e,height:t}),this.part&&this._params&&this.part.update(this._params.params)}init(e){this._params=e,this.part=this.getComponent()}update(e){var t,i;this._params=G(G({},this._params),{},{params:G(G({},(t=this._params)===null||t===void 0?void 0:t.params),e.params)});for(let n of Object.keys(e.params))e.params[n]===void 0&&delete this._params.params[n];(i=this.part)===null||i===void 0||i.update({params:this._params.params})}toJSON(){var e,t;let i=(e=(t=this._params)===null||t===void 0?void 0:t.params)!==null&&e!==void 0?e:{};return{id:this.id,component:this.component,params:Object.keys(i).length>0?i:void 0}}dispose(){var e;this.api.dispose(),(e=this.part)===null||e===void 0||e.dispose(),super.dispose()}},li=class extends ft{set orientation(e){this._orientation=e}get orientation(){return this._orientation}get minimumSize(){return this.headerSize+(this.isExpanded()?this._minimumBodySize:0)}get maximumSize(){return this.headerSize+(this.isExpanded()?this._maximumBodySize:0)}get size(){return this._size}get orthogonalSize(){return this._orthogonalSize}set orthogonalSize(e){this._orthogonalSize=e}get minimumBodySize(){return this._minimumBodySize}set minimumBodySize(e){this._minimumBodySize=typeof e=="number"?e:0}get maximumBodySize(){return this._maximumBodySize}set maximumBodySize(e){this._maximumBodySize=typeof e=="number"?e:Number.POSITIVE_INFINITY}get headerVisible(){return this._headerVisible}set headerVisible(e){this._headerVisible=e,this.header.style.display=e?"":"none"}constructor(e){super(e.id,e.component,new ho(e.id,e.component)),this._onDidChangeExpansionState=new m({replay:!0}),this.onDidChangeExpansionState=this._onDidChangeExpansionState.event,this._onDidChange=new m,this.onDidChange=this._onDidChange.event,this._orthogonalSize=0,this._size=0,this._isExpanded=!1,this.api.pane=this,this.api.initialize(this),this.headerSize=e.headerSize,this.headerComponent=e.headerComponent,this._minimumBodySize=e.minimumBodySize,this._maximumBodySize=e.maximumBodySize,this._isExpanded=e.isExpanded,this._headerVisible=e.isHeaderVisible,this._onDidChangeExpansionState.fire(this.isExpanded()),this._orientation=e.orientation,this.element.classList.add("dv-pane"),this.addDisposables(this.api.onWillVisibilityChange(t=>{let{isVisible:i}=t,{accessor:n}=this._params;n.setVisible(this,i)}),this.api.onDidSizeChange(t=>{this._onDidChange.fire({size:t.size})}),C(this.element,"mouseenter",t=>{this.api._onMouseEnter.fire(t)}),C(this.element,"mouseleave",t=>{this.api._onMouseLeave.fire(t)})),this.addDisposables(this._onDidChangeExpansionState,this.onDidChangeExpansionState(t=>{this.api._onDidExpansionChange.fire({isExpanded:t})}),this.api.onDidFocusChange(t=>{this.header&&(t.isFocused?re(this.header,"focused"):oe(this.header,"focused"))})),this.renderOnce()}setVisible(e){this.api._onDidVisibilityChange.fire({isVisible:e})}setActive(e){this.api._onDidActiveChange.fire({isActive:e})}isExpanded(){return this._isExpanded}setExpanded(e){var t;this._isExpanded!==e&&(this._isExpanded=e,e?(this.animationTimer&&clearTimeout(this.animationTimer),this.body&&this.element.appendChild(this.body)):(this._expandedSize=this._size,this.animationTimer=setTimeout(()=>{var i;(i=this.body)===null||i===void 0||i.remove()},200)),this._onDidChange.fire(e?{size:(t=this._expandedSize)!==null&&t!==void 0?t:this.width}:{}),this._onDidChangeExpansionState.fire(e))}layout(e,t){this._size=e,this._orthogonalSize=t;let[i,n]=this.orientation==="HORIZONTAL"?[e,t]:[t,e];super.layout(i,n)}init(e){var t,i;super.init(e),typeof e.minimumBodySize=="number"&&(this.minimumBodySize=e.minimumBodySize),typeof e.maximumBodySize=="number"&&(this.maximumBodySize=e.maximumBodySize),this.bodyPart=this.getBodyComponent(),this.headerPart=this.getHeaderComponent(),this.bodyPart.init(G(G({},e),{},{api:this.api})),this.headerPart.init(G(G({},e),{},{api:this.api})),(t=this.body)===null||t===void 0||t.append(this.bodyPart.element),(i=this.header)===null||i===void 0||i.append(this.headerPart.element),typeof e.isExpanded=="boolean"&&this.setExpanded(e.isExpanded)}toJSON(){let e=this._params;return G(G({},super.toJSON()),{},{headerComponent:this.headerComponent,title:e.title})}renderOnce(){this.header=document.createElement("div"),this.header.tabIndex=0,this.header.className="dv-pane-header",this.header.style.height=`${this.headerSize}px`,this.header.style.lineHeight=`${this.headerSize}px`,this.header.style.minHeight=`${this.headerSize}px`,this.header.style.maxHeight=`${this.headerSize}px`,this.element.appendChild(this.header),this.body=document.createElement("div"),this.body.className="dv-pane-body",this.element.appendChild(this.body)}getComponent(){return{update:e=>{var t,i;(t=this.bodyPart)===null||t===void 0||t.update({params:e}),(i=this.headerPart)===null||i===void 0||i.update({params:e})},dispose:()=>{var e,t;(e=this.bodyPart)===null||e===void 0||e.dispose(),(t=this.headerPart)===null||t===void 0||t.dispose()}}}},hi=class extends li{constructor(e){super({id:e.id,component:e.component,headerComponent:e.headerComponent,orientation:e.orientation,isExpanded:e.isExpanded,isHeaderVisible:!0,headerSize:e.headerSize,minimumBodySize:e.minimumBodySize,maximumBodySize:e.maximumBodySize}),this._onDidDrop=new m,this.onDidDrop=this._onDidDrop.event,this._onUnhandledDragOver=new m,this.onUnhandledDragOver=this._onUnhandledDragOver.event,this.accessor=e.accessor,this.addDisposables(this._onDidDrop,this._onUnhandledDragOver),e.disableDnd||this.initDragFeatures()}initDragFeatures(){if(!this.header)return;let e=this.id,t=this.accessor.id;this.header.draggable=!0;let i={getData:()=>(ue.getInstance().setData([new te(t,e)],te.prototype),{dispose:()=>{ue.getInstance().clearData(te.prototype)}})};this.html5DragSource=ge.createDragSource(this.header,i),this.pointerDragSource=le.createDragSource(this.header,i);let o={acceptedTargetZones:["top","bottom"],overlayModel:{activationSize:{type:"percentage",value:50}},canDisplayOverlay:(r,a)=>{let s=Ce();if(s&&s.paneId!==this.id&&s.viewId===this.accessor.id)return!0;let d=new ri(r,a,Ce,this);return this._onUnhandledDragOver.fire(d),d.isAccepted}};this.target=ge.createDropTarget(this.element,o),this.pointerTarget=le.createDropTarget(this.element,o),this.addDisposables(this._onDidDrop,this.html5DragSource,this.pointerDragSource,this.target,this.pointerTarget,this.target.onDrop(r=>{this.onDrop(r)}),this.pointerTarget.onDrop(r=>{this.onDrop(r)}))}onDrop(e){let t=Ce();if(t?.viewId!==this.accessor.id){this._onDidDrop.fire(G(G({},e),{},{panel:this,api:new Se(this.accessor),getData:Ce}));return}let i=this._params.containerApi,n=t.paneId,o=i.getPanel(n);if(!o){this._onDidDrop.fire(G(G({},e),{},{panel:this,getData:Ce,api:new Se(this.accessor)}));return}let r=i.panels,a=r.indexOf(o),s=i.panels.indexOf(this);(e.position==="left"||e.position==="top")&&(s=Math.max(0,s-1)),(e.position==="right"||e.position==="bottom")&&(a>s&&s++,s=Math.min(r.length-1,s)),i.movePanel(a,s)}};let co=0,vo=()=>`dv-tabpanel-${co++}`;var ci=class extends k{get element(){return this._element}constructor(e,t){var i,n,o,r,a,s,d;super(),this.accessor=e,this.group=t,this.disposable=new H,this._onDidFocus=new m,this.onDidFocus=this._onDidFocus.event,this._onDidBlur=new m,this.onDidBlur=this._onDidBlur.event,this._element=document.createElement("div"),this._element.className="dv-content-container",this._element.tabIndex=-1,this._element.id=vo(),this._element.setAttribute("role","tabpanel"),this.addDisposables(this._onDidFocus,this._onDidBlur);let l=()=>{var c;return(c=t.dropTargetContainer)===null||c===void 0?void 0:c.model},h=(c,v)=>this.group.canDisplayContentOverlay(c,v);this.dropTarget=new bt(this.element,{getOverlayOutline:()=>{var c;return((c=e.options.theme)===null||c===void 0?void 0:c.dndPanelOverlay)==="group"?this.element.parentElement:null},className:"dv-drop-target-content",acceptedTargetZones:["top","bottom","left","right","center"],canDisplayOverlay:h,getOverrideTarget:l,overlayModel:(i=(n=this.accessor).resolveDropOverlayModel)===null||i===void 0?void 0:i.call(n,"content"),getPositionResolver:()=>{var c;return(c=e.getDropPositionResolver)===null||c===void 0?void 0:c.call(e)}}),this.pointerDropTarget=le.createDropTarget(this.element,{acceptedTargetZones:["top","bottom","left","right","center"],canDisplayOverlay:h,getOverlayOutline:()=>{var c;return((c=e.options.theme)===null||c===void 0?void 0:c.dndPanelOverlay)==="group"?this.element.parentElement:null},className:"dv-drop-target-content",getOverrideTarget:l,overlayModel:(o=(r=this.accessor).resolveDropOverlayModel)===null||o===void 0?void 0:o.call(r,"content"),getPositionResolver:()=>{var c;return(c=e.getDropPositionResolver)===null||c===void 0?void 0:c.call(e)}}),this.addDisposables(this.dropTarget,this.pointerDropTarget,(a=(s=(d=this.accessor).onDidOptionsChange)===null||s===void 0?void 0:s.call(d,()=>{var c,v,p;let u=(c=(v=(p=this.accessor).resolveDropOverlayModel)===null||v===void 0?void 0:v.call(p,"content"))!==null&&c!==void 0?c:{};this.dropTarget.setOverlayModel(u),this.pointerDropTarget.setOverlayModel(u)}))!==null&&a!==void 0?a:M.NONE)}show(){this.element.style.display=""}hide(){this.element.style.display="none"}setLabelledBy(e){e?this._element.setAttribute("aria-labelledby",e):this._element.removeAttribute("aria-labelledby")}renderPanel(e,t){var i,n;let o=((i=t?.asActive)!==null&&i!==void 0?i:!0)||this.panel&&this.group.isPanelActive(this.panel);if(((n=this.panel)===null||n===void 0?void 0:n.view.content.element.parentElement)===this._element){var r,a;this.panel.view.content.element.remove(),(r=(a=this.panel.view.content).onHide)===null||r===void 0||r.call(a)}this.panel=e;let s;switch(e.api.renderer){case"onlyWhenVisible":if(this.group.renderContainer.detatch(e),this.panel&&o){var d,l;this._element.appendChild(this.panel.view.content.element),(d=(l=this.panel.view.content).onShow)===null||d===void 0||d.call(l)}s=this._element;break;case"always":e.view.content.element.parentElement===this._element&&e.view.content.element.remove(),s=this.group.renderContainer.attach({panel:e,referenceContainer:this});break;default:throw new Error(`dockview: invalid renderer type '${e.api.renderer}'`)}if(o){let h=Rt(s);this.focusTracker=h;let c=new k;c.addDisposables(h,h.onDidFocus(()=>this._onDidFocus.fire()),h.onDidBlur(()=>this._onDidBlur.fire())),this.disposable.value=c}}openPanel(e){this.panel!==e&&this.renderPanel(e)}layout(e,t){}closePanel(){if(this.panel&&this.panel.api.renderer==="onlyWhenVisible"){var e,t;this.panel.view.content.element.remove(),(e=(t=this.panel.view.content).onHide)===null||e===void 0||e.call(t)}this.panel=void 0}dispose(){this.disposable.dispose(),super.dispose()}refreshFocusState(){var e;!((e=this.focusTracker)===null||e===void 0)&&e.refreshState&&this.focusTracker.refreshState()}};let Ne=e=>{let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttributeNS(null,"height",e.height),t.setAttributeNS(null,"width",e.width),t.setAttributeNS(null,"viewBox",e.viewbox),t.setAttributeNS(null,"aria-hidden","false"),t.setAttributeNS(null,"focusable","false"),t.classList.add("dv-svg");let i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttributeNS(null,"d",e.path),t.appendChild(i),t},vi=()=>Ne({width:"11",height:"11",viewbox:"0 0 28 28",path:"M2.1 27.3L0 25.2L11.55 13.65L0 2.1L2.1 0L13.65 11.55L25.2 0L27.3 2.1L15.75 13.65L27.3 25.2L25.2 27.3L13.65 15.75L2.1 27.3Z"}),_t=()=>Ne({width:"11",height:"11",viewbox:"0 0 24 24",path:"M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"}),po=()=>Ne({width:"11",height:"11",viewbox:"0 0 24 15",path:"M12 14.15L0 2.15L2.15 0L12 9.9L21.85 0.0499992L24 2.2L12 14.15Z"}),pi=()=>Ne({width:"11",height:"11",viewbox:"0 0 15 25",path:"M2.15 24.1L0 21.95L9.9 12.05L0 2.15L2.15 0L14.2 12.05L2.15 24.1Z"}),uo=500,go=8;var wt=class extends k{constructor(e,t){super(),this.element=e,this.options=t,this._startX=0,this._startY=0,this.addDisposables(C(this.element,"pointerdown",i=>{this._onPointerDown(i)}))}_onPointerDown(e){var t,i,n,o,r;if((!((t=this.options.touchOnly)!==null&&t!==void 0)||t)&&e.pointerType!=="touch"&&e.pointerType!=="pen")return;this._cancelPending(),this._pointerId=e.pointerId,this._startX=e.clientX,this._startY=e.clientY;let a=(i=this.options.delay)!==null&&i!==void 0?i:uo,s=(n=this.options.tolerance)!==null&&n!==void 0?n:go,d=(o=(r=this.element.ownerDocument)===null||r===void 0?void 0:r.defaultView)!==null&&o!==void 0?o:globalThis.window;this._timer=setTimeout(()=>{this._timer=void 0,this._cancelPending(),this._installContextMenuGuard(d),this._installClickGuard(d),this.options.onLongPress(e)},a),this._moveListener=C(d,"pointermove",l=>{if(l.pointerId!==this._pointerId)return;let h=l.clientX-this._startX,c=l.clientY-this._startY;Math.hypot(h,c)>s&&this._cancelPending()}),this._upListener=C(d,"pointerup",l=>{l.pointerId===this._pointerId&&this._cancelPending()}),this._cancelListener=C(d,"pointercancel",l=>{l.pointerId===this._pointerId&&this._cancelPending()})}_installContextMenuGuard(e){let t,i=setTimeout(()=>t?.dispose(),500);t=C(e,"contextmenu",n=>{n.preventDefault(),clearTimeout(i),t?.dispose()},{capture:!0})}_installClickGuard(e){let t,i=setTimeout(()=>t?.dispose(),500);t=C(e,"click",n=>{let o=n.target;o&&this.element.contains(o)&&(n.preventDefault(),n.stopPropagation()),clearTimeout(i),t?.dispose()},{capture:!0})}_cancelPending(){var e,t,i;this._timer!==void 0&&(clearTimeout(this._timer),this._timer=void 0),this._pointerId=void 0,(e=this._moveListener)===null||e===void 0||e.dispose(),(t=this._upListener)===null||t===void 0||t.dispose(),(i=this._cancelListener)===null||i===void 0||i.dispose(),this._moveListener=void 0,this._upListener=void 0,this._cancelListener=void 0}dispose(){this._cancelPending(),super.dispose()}};function he(e){if(e.disableDnd)return{html5:!1,pointer:!1,pointerHandlesMouse:!1};switch(e.dndStrategy){case"pointer":return{html5:!1,pointer:!0,pointerHandlesMouse:!0};case"html5":return{html5:!0,pointer:!1,pointerHandlesMouse:!1};default:return mo()?{html5:!1,pointer:!0,pointerHandlesMouse:!0}:{html5:!0,pointer:!0,pointerHandlesMouse:!1}}}function mo(){if(globalThis.window===void 0||!globalThis.matchMedia)return!1;let e=globalThis.matchMedia("(pointer: coarse)").matches,t=globalThis.matchMedia("(pointer: fine)").matches;return e&&!t}let bo=0,fo=()=>`dv-tab-${bo++}`;var ui=class extends k{get element(){return this._element}constructor(e,t,i){var n,o,r,a,s,d,l,h;super(),this.panel=e,this.accessor=t,this.group=i,this.content=void 0,this.panelTransfer=ue.getInstance(),this._direction="horizontal",this._pinIndicator=void 0,this._onPointDown=new m,this.onPointerDown=this._onPointDown.event,this._onTabClick=new m,this.onTabClick=this._onTabClick.event,this._onDropped=new m,this.onDrop=this._onDropped.event,this._onDragStart=new m,this.onDragStart=this._onDragStart.event,this._onDragEnd=new m,this.onDragEnd=this._onDragEnd.event;let c=he(this.accessor.options);this._element=document.createElement("div"),this._element.className="dv-tab",this._element.tabIndex=-1,this._element.draggable=c.html5,this._element.id=fo(),this._element.setAttribute("role","tab"),this._element.setAttribute("aria-selected","false"),this._element.setAttribute("aria-label",(n=this.panel.title)!==null&&n!==void 0?n:this.panel.id),this._element.dataset.tabPanelId=this.panel.id;let v=(o=this.group)===null||o===void 0||(o=o.model)===null||o===void 0?void 0:o.contentContainerId;v&&this._element.setAttribute("aria-controls",v),x(this.element,"dv-inactive-tab",!0),this._updatePinnedClasses();let p=(g,b)=>{if(this.group.locked)return!1;let D=$();if(this.accessor.id===D?.viewId){var w;return!(((w=this.accessor.options.theme)===null||w===void 0?void 0:w.tabAnimation)==="smooth"||D.tabGroupId&&this.group.model.getTabGroupForPanel(this.panel.id))}return this.group.model.canDisplayOverlay(g,b,"tab")};this.dropTarget=ge.createDropTarget(this._element,{acceptedTargetZones:["left","right"],overlayModel:this._buildOverlayModel(),canDisplayOverlay:p,getOverrideTarget:()=>{var g;return(g=i.model.dropTargetContainer)===null||g===void 0?void 0:g.model}}),this.pointerDropTarget=le.createDropTarget(this._element,{acceptedTargetZones:["left","right"],overlayModel:this._buildOverlayModel(),canDisplayOverlay:p,getOverrideTarget:()=>{var g;return(g=i.model.dropTargetContainer)===null||g===void 0?void 0:g.model}});let u={getData:()=>(this.panelTransfer.setData([new J(this.accessor.id,this.group.id,this.panel.id)],J.prototype),{dispose:()=>{this.panelTransfer.clearData(J.prototype)}}),createGhost:()=>({element:this._buildGhostElement(),offsetX:30,offsetY:-10}),onDragStart:g=>{var b;this._onDragStart.fire(g),!(g instanceof PointerEvent)&&((b=this.accessor.options.theme)===null||b===void 0?void 0:b.tabAnimation)==="smooth"&&requestAnimationFrame(()=>{x(this.element,"dv-tab--dragging",!0)})},onDragEnd:g=>{this._onDragEnd.fire(g)}};this.html5DragSource=ge.createDragSource(this._element,G(G({},u),{},{disabled:!c.html5})),this.pointerDragSource=le.createDragSource(this._element,G(G({},u),{},{disabled:!c.pointer,touchOnly:!c.pointerHandlesMouse,isCancelled:()=>!he(this.accessor.options).pointer})),this.onWillShowOverlay=q.any(this.dropTarget.onWillShowOverlay,this.pointerDropTarget.onWillShowOverlay),this.addDisposables(this._onPointDown,this._onTabClick,this._onDropped,this._onDragStart,this._onDragEnd,this.accessor.onDidOptionsChange(()=>{let g=this._buildOverlayModel();this.dropTarget.setOverlayModel(g),this.pointerDropTarget.setOverlayModel(g),this._updatePinnedClasses()}),(r=(a=this.panel.api)===null||a===void 0||(s=a.onDidChangePinned)===null||s===void 0?void 0:s.call(a,()=>{this._updatePinnedClasses()}))!==null&&r!==void 0?r:{dispose:()=>{}},(d=(l=this.panel.api)===null||l===void 0||(h=l.onDidTitleChange)===null||h===void 0?void 0:h.call(l,g=>{var b;this._element.setAttribute("aria-label",(b=g.title)!==null&&b!==void 0?b:this.panel.id)}))!==null&&d!==void 0?d:{dispose:()=>{}},C(this._element,"dragend",()=>{x(this.element,"dv-tab--dragging",!1)}),this.html5DragSource,C(this._element,"pointerdown",g=>{this._onPointDown.fire(g)}),C(this._element,"click",g=>{this._onTabClick.fire(g)}),C(this._element,"contextmenu",g=>{var b;(b=this.accessor.contextMenuService)===null||b===void 0||b.show(this.panel,this.group,g)}),new wt(this._element,{onLongPress:g=>{var b;this.pointerDragSource.cancelPending(),(b=this.accessor.contextMenuService)===null||b===void 0||b.show(this.panel,this.group,g)}}),this.dropTarget.onDrop(g=>{this._onDropped.fire(g)}),this.pointerDropTarget.onDrop(g=>{this._onDropped.fire(g)}),this.dropTarget,this.pointerDropTarget,this.pointerDragSource)}_updatePinnedClasses(){var e,t,i,n;let o=(e=(t=this.panel.api)===null||t===void 0?void 0:t.isPinned)!==null&&e!==void 0?e:!1,r=o&&((i=this.accessor.options.pinnedTabs)===null||i===void 0?void 0:i.compact)===!0;x(this.element,"dv-tab--pinned",o),x(this.element,"dv-tab--pinned-compact",r);let a=o&&!(!((n=this.panel.api)===null||n===void 0)&&n.tabComponent);if(a&&!this._pinIndicator){let s=document.createElement("div");s.className="dv-tab-pin",s.appendChild(_t()),this._element.insertBefore(s,this._element.firstChild),this._pinIndicator=s}else!a&&this._pinIndicator&&(this._pinIndicator.remove(),this._pinIndicator=void 0)}setActive(e){x(this.element,"dv-active-tab",e),x(this.element,"dv-inactive-tab",!e),this._element.setAttribute("aria-selected",e?"true":"false"),this._element.tabIndex=e?0:-1}setContent(e){this.content&&this.content.element.remove(),this.content=e,this._element.appendChild(this.content.element)}_buildOverlayModel(){var e,t,i;let n=(e=(t=this.accessor).resolveDropOverlayModel)===null||e===void 0?void 0:e.call(t,"tab",this.group);if(n)return n;let o=((i=this.accessor.options.theme)===null||i===void 0?void 0:i.dndTabIndicator)==="line"?Number.POSITIVE_INFINITY:0;return{activationSize:{value:50,type:"percentage"},smallWidthBoundary:o,smallHeightBoundary:o}}setDirection(e){this._direction=e;let t=e==="vertical"?["top","bottom"]:["left","right"];this.dropTarget.setTargetZones(t),this.pointerDropTarget.setTargetZones(t)}updateDragAndDropState(){let e=he(this.accessor.options);this._element.draggable=e.html5,this.html5DragSource.setDisabled(!e.html5),this.pointerDragSource.setDisabled(!e.pointer),this.pointerDragSource.setTouchOnly(!e.pointerHandlesMouse)}_buildGhostElement(){let e=getComputedStyle(this.element),t=this.element.cloneNode(!0),i=this._direction==="vertical",n=new Set(["writing-mode","inline-size","block-size","min-inline-size","min-block-size","max-inline-size","max-block-size","margin-inline","margin-inline-start","margin-inline-end","margin-block","margin-block-start","margin-block-end","padding-inline","padding-inline-start","padding-inline-end","padding-block","padding-block-start","padding-block-end"]);return Array.from(e).forEach(o=>{i&&n.has(o)||t.style.setProperty(o,e.getPropertyValue(o),e.getPropertyPriority(o))}),i&&(t.style.setProperty("writing-mode","horizontal-tb"),t.style.setProperty("width",e.height),t.style.setProperty("height",e.width)),t.style.position="absolute",t.classList.add("dv-tab-ghost-drag"),t}},ke=class{get kind(){return this.options.kind}get nativeEvent(){return this.event.nativeEvent}get position(){return this.event.position}get edge(){return this.event.edge}get edgeGroup(){return this.event.edgeGroup}get defaultPrevented(){return this.event.defaultPrevented}get panel(){return this.options.panel}get api(){return this.options.api}get group(){return this.options.group}preventDefault(){this.event.preventDefault()}getData(){return this.options.getData()}constructor(e,t){this.event=e,this.options=t}};let aa=500;var gi=class extends k{get group(){return this.groupAccessor()}constructor(e){var t,i;super(),this.panelTransfer=ue.getInstance(),this._onDragStart=new m,this.onDragStart=this._onDragStart.event,this._element=e.element,this.accessor=e.accessor;let n=e.group;this.groupAccessor=typeof n=="function"?n:()=>n,this.isFloatingMoveHandle=(t=e.isFloatingMoveHandle)!==null&&t!==void 0?t:(()=>!0);let o=he(this.accessor.options);this._element.draggable=o.html5,x(this._element,"dv-draggable",o.html5||o.pointer),this.addDisposables(this._onDragStart);let r=()=>{let v=document.createElement("div"),p=globalThis.getComputedStyle(this._element),u=p.getPropertyValue("--dv-activegroup-visiblepanel-tab-background-color"),g=p.getPropertyValue("--dv-activegroup-visiblepanel-tab-color");return v.style.backgroundColor=u,v.style.color=g,v.style.padding="2px 8px",v.style.height="24px",v.style.fontSize="11px",v.style.lineHeight="20px",v.style.borderRadius="12px",v.style.whiteSpace="nowrap",v.style.boxSizing="border-box",v.style.display="inline-block",v.textContent=`Multiple Panels (${this.group.size})`,v},s={getData:()=>(this.panelTransfer.setData([new J(this.accessor.id,this.group.id,null)],J.prototype),{dispose:()=>{this.panelTransfer.clearData(J.prototype)}}),createGhost:()=>{var v,p;let u=(v=(p=this.accessor).buildGroupDragGhost)===null||v===void 0?void 0:v.call(p,this.group);return u||{element:r(),offsetX:30,offsetY:-10}},onDragStart:v=>{this._onDragStart.fire(v)}};this.html5DragSource=ge.createDragSource(this._element,G(G({},s),{},{disabled:!o.html5,isCancelled:v=>!!(this.group.api.location.type==="floating"&&this.isFloatingMoveHandle()&&!v.shiftKey||this.group.api.location.type==="edge"&&this.group.size===0)}));let d=()=>{var v;return((v=this.group)===null||v===void 0||(v=v.api)===null||v===void 0||(v=v.location)===null||v===void 0?void 0:v.type)==="floating"&&this.isFloatingMoveHandle()};this.pointerDragSource=le.createDragSource(this._element,G(G({},s),{},{disabled:!o.pointer,touchOnly:!o.pointerHandlesMouse,touchInitiationDelay:()=>d()?500:250,pressTolerance:()=>d()?1/0:8,isCancelled:()=>!he(this.accessor.options).pointer||this.group.api.location.type==="edge"&&this.group.size===0,onDragStart:v=>{var p;(p=this.getFloatingOverlay())===null||p===void 0||p.cancelPendingDrag(),this._onDragStart.fire(v)}}));let l=new H,h=()=>{let v=this.getFloatingOverlay();l.value=v?v.onDidStartMoving(()=>{this.pointerDragSource.cancelPending()}):M.NONE};h(),this.addDisposables(l);let c=(i=this.group)===null||i===void 0||(i=i.api)===null||i===void 0?void 0:i.onDidLocationChange;c&&this.addDisposables(c(h)),this.addDisposables(this.html5DragSource,this.pointerDragSource)}updateDragAndDropState(){let e=he(this.accessor.options);this._element.draggable=e.html5,x(this._element,"dv-draggable",e.html5||e.pointer),this.html5DragSource.setDisabled(!e.html5),this.pointerDragSource.setDisabled(!e.pointer),this.pointerDragSource.setTouchOnly(!e.pointerHandlesMouse)}getFloatingOverlay(){var e;if(this.group)return(e=this.accessor.floatingGroups)===null||e===void 0||(e=e.find(t=>t.group===this.group))===null||e===void 0?void 0:e.overlay}},_o=class extends k{get element(){return this._element}constructor(e,t){var i,n,o,r,a,s,d;super(),this.accessor=e,this.group=t,this._onDrop=new m,this.onDrop=this._onDrop.event,this._onDragStart=new m,this.onDragStart=this._onDragStart.event,this._element=document.createElement("div"),this._element.className="dv-void-container",this.addDisposables(this._onDrop,this._onDragStart,C(this._element,"pointerdown",()=>{this.accessor.doSetGroupActive(this.group)}),C(this._element,"pointerdown",h=>{h.shiftKey&&$t(h)},!0)),this.dragSource=new gi({element:this._element,accessor:this.accessor,group:this.group,isFloatingMoveHandle:()=>!this._element.closest(".dv-resize-container-with-titlebar")});let l=(h,c)=>{if(this.group.api.locked)return!1;let v=$();return this.accessor.id===v?.viewId?!0:t.model.canDisplayOverlay(h,c,"header_space")};this.dropTarget=ge.createDropTarget(this._element,{acceptedTargetZones:["center"],canDisplayOverlay:l,getOverrideTarget:()=>{var h;return(h=t.model.dropTargetContainer)===null||h===void 0?void 0:h.model},overlayModel:(i=(n=this.accessor).resolveDropOverlayModel)===null||i===void 0?void 0:i.call(n,"header_space",this.group)}),this.pointerDropTarget=le.createDropTarget(this._element,{acceptedTargetZones:["center"],canDisplayOverlay:l,getOverrideTarget:()=>{var h;return(h=t.model.dropTargetContainer)===null||h===void 0?void 0:h.model},overlayModel:(o=(r=this.accessor).resolveDropOverlayModel)===null||o===void 0?void 0:o.call(r,"header_space",this.group)}),this.onWillShowOverlay=q.any(this.dropTarget.onWillShowOverlay,this.pointerDropTarget.onWillShowOverlay),this.addDisposables(this.dragSource,this.dragSource.onDragStart(h=>{this._onDragStart.fire(h)}),this.dropTarget.onDrop(h=>{this._onDrop.fire(h)}),this.pointerDropTarget.onDrop(h=>{this._onDrop.fire(h)}),this.dropTarget,this.pointerDropTarget,(a=(s=(d=this.accessor).onDidOptionsChange)===null||s===void 0?void 0:s.call(d,()=>{var h,c,v;let p=(h=(c=(v=this.accessor).resolveDropOverlayModel)===null||c===void 0?void 0:c.call(v,"header_space",this.group))!==null&&h!==void 0?h:{};this.dropTarget.setOverlayModel(p),this.pointerDropTarget.setOverlayModel(p)}))!==null&&a!==void 0?a:M.NONE)}updateDragAndDropState(){this.dragSource.updateDragAndDropState()}},mi=class mn extends k{get element(){return this._element}get orientation(){return this._orientation}set orientation(t){this._orientation!==t&&(this._scrollOffset=0,this._orientation=t,oe(this._scrollbar,"dv-scrollbar-vertical","dv-scrollbar-horizontal"),t==="vertical"?re(this._scrollbar,"dv-scrollbar-vertical"):re(this._scrollbar,"dv-scrollbar-horizontal"))}constructor(t){super(),this.scrollableElement=t,this._scrollOffset=0,this._orientation="horizontal",this._element=document.createElement("div"),this._element.className="dv-scrollable",this._scrollbar=document.createElement("div"),this._scrollbar.className="dv-scrollbar dv-scrollbar-horizontal",this.element.appendChild(t),this.element.appendChild(this._scrollbar),this.addDisposables(C(this.element,"wheel",i=>{this._scrollOffset+=i.deltaY*mn.MouseWheelSpeed,this.scheduleStyleUpdate()}),C(this._scrollbar,"pointerdown",i=>{var n;i.preventDefault();let o=(n=this._scrollbar.ownerDocument)!==null&&n!==void 0?n:document;x(this.element,"dv-scrollable-scrolling",!0);let r=this._orientation==="horizontal"?i.clientX:i.clientY,a=this._scrollOffset,s=l=>{let h=this._orientation==="horizontal"?l.clientX-r:l.clientY-r,c=(this._orientation==="horizontal"?this.element.clientWidth:this.element.clientHeight)/(this._orientation==="horizontal"?this.scrollableElement.scrollWidth:this.scrollableElement.scrollHeight);this._scrollOffset=a+h/c,this.scheduleStyleUpdate()},d=()=>{x(this.element,"dv-scrollable-scrolling",!1),o.removeEventListener("pointermove",s),o.removeEventListener("pointerup",d),o.removeEventListener("pointercancel",d)};o.addEventListener("pointermove",s),o.addEventListener("pointerup",d),o.addEventListener("pointercancel",d)}),C(this.element,"scroll",()=>{this.scheduleStyleUpdate()}),C(this.scrollableElement,"scroll",()=>{this._scrollOffset=this._orientation==="horizontal"?this.scrollableElement.scrollLeft:this.scrollableElement.scrollTop,this.scheduleStyleUpdate()}),_e(this.element,()=>{x(this.element,"dv-scrollable-resizing",!0),this._animationTimer&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(()=>{clearTimeout(this._animationTimer),x(this.element,"dv-scrollable-resizing",!1)},500),this.scheduleStyleUpdate()}),M.from(()=>{this._pendingStyleFrame!==void 0&&(cancelAnimationFrame(this._pendingStyleFrame),this._pendingStyleFrame=void 0)}))}scheduleStyleUpdate(){this._pendingStyleFrame===void 0&&(this._pendingStyleFrame=requestAnimationFrame(()=>{this._pendingStyleFrame=void 0,this.calculateScrollbarStyles()}))}calculateScrollbarStyles(){let t=this._orientation==="horizontal"?this.element.clientWidth:this.element.clientHeight,i=this._orientation==="horizontal"?this.scrollableElement.scrollWidth:this.scrollableElement.scrollHeight;if(i>t){let n=t*(t/i);this._orientation==="horizontal"?(this._scrollbar.style.width=`${n}px`,this._scrollbar.style.height=""):(this._scrollbar.style.height=`${n}px`,this._scrollbar.style.width=""),this._scrollOffset=N(this._scrollOffset,0,i-t),this._orientation==="horizontal"?this.scrollableElement.scrollLeft=this._scrollOffset:this.scrollableElement.scrollTop=this._scrollOffset;let o=this._scrollOffset/(i-t);this._orientation==="horizontal"?(this._scrollbar.style.left=`${(t-n)*o}px`,this._scrollbar.style.top=""):(this._scrollbar.style.top=`${(t-n)*o}px`,this._scrollbar.style.left="")}else this._orientation==="horizontal"?(this._scrollbar.style.width="0px",this._scrollbar.style.left="0px"):(this._scrollbar.style.height="0px",this._scrollbar.style.top="0px"),this._scrollOffset=0}};mi.MouseWheelSpeed=1;let Dt="dv-tabs-container--wrap",wo="dv-tabs-container--wrap-capped",Do="--dv-max-tab-rows",xo="--dv-wrap-vertical-tab-height";function bi(e,t){return typeof e=="boolean"?e:!!e?.[t]}function We(e){return typeof e=="boolean"?e:e?Object.values(e).some(Boolean):!1}var xt=class extends Ot{constructor(e,t,i,n,o){super(),this.nativeEvent=e,this.target=t,this.position=i,this.getData=n,this.group=o}};let yo=Object.keys({disableAutoResizing:void 0,hideBorders:void 0,singleTabMode:void 0,disableFloatingGroups:void 0,floatingGroupBounds:void 0,transformFloatingGroupDrag:void 0,smartGuides:void 0,floatingGroupDragHandle:void 0,popoutUrl:void 0,nonce:void 0,defaultRenderer:void 0,defaultHeaderPosition:void 0,debug:void 0,locked:void 0,disableDnd:void 0,dndStrategy:void 0,className:void 0,noPanelsOverlay:void 0,dndEdges:void 0,dropPositionResolver:void 0,dndCompass:void 0,theme:void 0,disableTabsOverflowList:void 0,overflow:void 0,scrollbars:void 0,getTabContextMenuItems:void 0,getTabGroupChipContextMenuItems:void 0,createTabGroupChipComponent:void 0,createGroupDragGhostComponent:void 0,dropOverlayModel:void 0,announcements:void 0,getAnnouncement:void 0,announcer:void 0,messages:void 0,keyboardNavigation:void 0,layoutHistory:void 0,autoHideEdgeGroups:void 0,dockToEdgeGroups:void 0,edgeGroupPeek:void 0,tabGroupColors:void 0,tabGroupAccent:void 0,pinnedTabs:void 0});function fi(e){return!!e.referencePanel}function _i(e){return!!e.referenceGroup}function wi(e){return!!e.referencePanel}function Di(e){return!!e.referenceGroup}let He=[{id:"grey",value:"var(--dv-tab-group-color-grey)",label:"Grey"},{id:"blue",value:"var(--dv-tab-group-color-blue)",label:"Blue"},{id:"red",value:"var(--dv-tab-group-color-red)",label:"Red"},{id:"yellow",value:"var(--dv-tab-group-color-yellow)",label:"Yellow"},{id:"green",value:"var(--dv-tab-group-color-green)",label:"Green"},{id:"pink",value:"var(--dv-tab-group-color-pink)",label:"Pink"},{id:"purple",value:"var(--dv-tab-group-color-purple)",label:"Purple"},{id:"cyan",value:"var(--dv-tab-group-color-cyan)",label:"Cyan"},{id:"orange",value:"var(--dv-tab-group-color-orange)",label:"Orange"}];var yt=class{constructor(e,t=!0){this._entries=e.slice(),this._byId=new Map(e.map(i=>[i.id,i])),this._enabled=t}get enabled(){return this._enabled}set enabled(e){this._enabled=e}setEntries(e){this._entries=e.slice(),this._byId=new Map(e.map(t=>[t.id,t]))}entries(){return this._entries}has(e){return this._byId.has(e)}get(e){return this._byId.get(e)}defaultId(){var e;return(e=this._entries[0])===null||e===void 0?void 0:e.id}resolveValue(e){if(!this._enabled||!e)return;let t=this._byId.get(e);return t?t.value:e}};let Ct;function xi(){var e;return(e=Ct)!==null&&e!==void 0||(Ct=new yt(He,!0)),Ct}function Fe(e,t,i){let n=(i??xi()).resolveValue(t);n===void 0?e.style.removeProperty("--dv-tab-group-color"):e.style.setProperty("--dv-tab-group-color",n)}function Be(e,t){return(t??xi()).resolveValue(e)}var yi=class extends k{get element(){return this._element}constructor(e){super(),this._palette=e,this._onClick=new m,this.onClick=this._onClick.event,this._onContextMenu=new m,this.onContextMenu=this._onContextMenu.event,this._element=document.createElement("div"),this._element.className="dv-tab-group-chip",this._element.tabIndex=0,this._label=document.createElement("span"),this._label.className="dv-tab-group-chip-label",this._element.appendChild(this._label),this.addDisposables(this._onClick,this._onContextMenu,new wt(this._element,{onLongPress:t=>{this._onContextMenu.fire(t)}}),C(this._element,"click",t=>{this._onClick.fire(t)}),C(this._element,"contextmenu",t=>{this._onContextMenu.fire(t)}))}init(e){this._tabGroup=e.tabGroup,this.updateColor(e.tabGroup.color),this.updateLabel(e.tabGroup.label),this.updateCollapsed(e.tabGroup.collapsed),this.addDisposables(e.tabGroup.onDidChange(()=>{this._tabGroup&&(this.updateColor(this._tabGroup.color),this.updateLabel(this._tabGroup.label))}),e.tabGroup.onDidCollapseChange(t=>{this.updateCollapsed(t)}),this._onClick.event(()=>{var t;(t=this._tabGroup)===null||t===void 0||t.toggle()}))}update(e){this._tabGroup=e.tabGroup,this.updateColor(e.tabGroup.color),this.updateLabel(e.tabGroup.label),this.updateCollapsed(e.tabGroup.collapsed)}updateColor(e){var t;Fe(this._element,e,this._palette),x(this._element,"dv-tab-group-chip--accent-off",((t=this._palette)===null||t===void 0?void 0:t.enabled)===!1)}updateLabel(e){this._label.textContent=e,x(this._label,"dv-tab-group-chip-label--empty",!e)}updateCollapsed(e){x(this._element,"dv-tab-group-chip--collapsed",e)}};let Co="dv-tab-group-chip-continuation",Ci=8;var Si=class{get underlines(){return this._underlines}constructor(e){this._ctx=e,this._underlines=new Map,this._continuationMarkers=new Map,this._rafId=null}positionUnderlines(){requestAnimationFrame(()=>{this._positionUnderlinesSync()})}trackUnderlines(){this._rafId!==null&&cancelAnimationFrame(this._rafId);let e=performance.now(),t=250,i=()=>{this._positionUnderlinesSync(),performance.now()-e<t?this._rafId=requestAnimationFrame(i):this._rafId=null};this._rafId=requestAnimationFrame(i)}syncUnderlineElements(e){for(let t of e)if(!this._underlines.has(t)){let i=document.createElement("div");i.className="dv-tab-group-underline",this._ctx.tabsList.appendChild(i),this._underlines.set(t,i)}for(let[t,i]of this._underlines)e.has(t)||(i.remove(),this._underlines.delete(t),this._clearContinuationMarkers(t))}getUnderline(e){return this._underlines.get(e)}dispose(){this._rafId!==null&&(cancelAnimationFrame(this._rafId),this._rafId=null);for(let[,e]of this._underlines)e.remove();this._underlines.clear(),this._clearContinuationMarkers()}_syncContinuationMarkers(e,t){let i=this._continuationMarkers.get(e);for(i||(i=[],this._continuationMarkers.set(e,i));i.length<t;){let n=document.createElement("div");n.className=Co,this._ctx.tabsList.appendChild(n),i.push(n)}for(;i.length>t;){let n=i.pop();n?.remove()}return i}_clearContinuationMarkers(e){if(e===void 0){for(let[,i]of this._continuationMarkers)for(let n of i)n.remove();this._continuationMarkers.clear();return}let t=this._continuationMarkers.get(e);if(t){for(let i of t)i.remove();this._continuationMarkers.delete(e)}}_positionUnderlinesSync(){let e=this._ctx.tabsList.getBoundingClientRect(),t=this._ctx.getTabGroups(),i=this._ctx.getDirection()==="vertical",n=this._ctx.tabsList.classList.contains(Dt);n||this._clearContinuationMarkers();let o=i?e.width:e.height,r=this._ctx.getActivePanelId(),a=this._ctx.getTabMap();for(let s of t){let d=this._underlines.get(s.id);if(!d)continue;let l=s.panelIds;if(l.length===0){d.style.display="none";continue}if(d.style.display="",n){this._positionWrappedUnderline(d,s,e,a,i);continue}let h=this._ctx.getChipElement(s.id),c;if(h){let D=h.getBoundingClientRect(),w=getComputedStyle(h),_=i?Number.parseFloat(w.marginTop)||0:Number.parseFloat(w.marginLeft)||0;c=i?D.top-e.top-_:D.left-e.left-_}else{let D=l[0],w=a.get(D);if(w){let _=w.value.element.getBoundingClientRect();c=i?_.top-e.top:_.left-e.left}else c=0}let v=l[l.length-1],p=a.get(v);if(!p){i?(d.style.top=`${c}px`,d.style.height="0px",d.style.left="",d.style.width=""):(d.style.left=`${c}px`,d.style.width="0px",d.style.top="",d.style.height="");continue}let u=p.value.element.getBoundingClientRect(),g=i?u.bottom-e.top:u.right-e.left,b=g-c;if((s.collapsed||s.panelIds.some(D=>{let w=a.get(D);return w?.value.element.classList.contains("dv-tab--group-expanding")}))&&h){let D=h.getBoundingClientRect(),w=i?D.top+D.height/2-e.top:D.left+D.width/2-e.left,_=0,S=0;for(let y of s.panelIds){let P=a.get(y);if(!P)continue;let A=P.value.element;i?(_+=A.getBoundingClientRect().height,S+=A.scrollHeight):(_+=A.getBoundingClientRect().width,S+=A.scrollWidth)}let T=S>0?Math.min(1,_/S):0;c=w+(c-w)*T,g=w+(g-w)*T,b=Math.max(0,g-c)}i?(d.style.top=`${c}px`,d.style.height=`${Math.max(0,b)}px`,d.style.left="",d.style.width="",d.style.bottom=""):(d.style.left=`${c}px`,d.style.width=`${Math.max(0,b)}px`,d.style.top="",d.style.height="",d.style.bottom=""),this.applyShape(d,s,c,b,o,r,e,i)}}_positionWrappedUnderline(e,t,i,n,o){let a=Be(t.color,this._ctx.getColorPalette());if(a===void 0){e.style.display="none",this._clearContinuationMarkers(t.id);return}let{runs:s,firstRun:d}=this._computeWrappedRuns(t,i,n,o);if(s.length===0){e.style.display="none",this._clearContinuationMarkers(t.id);return}this._positionContinuationMarkers(t.id,s,d,a,o);let l=Math.min(...s.map(_=>_.left)),h=Math.max(...s.map(_=>_.right)),c=Math.min(...s.map(_=>_.top)),v=Math.max(...s.map(_=>_.bottom)),p=o?Math.max(0,h-l):i.width,u=o?i.height:Math.max(0,v-c);e.style.left=o?`${l}px`:"0px",e.style.top=o?"0px":`${c}px`,e.style.bottom="auto",e.style.width=`${p}px`,e.style.height=`${u}px`,e.style.backgroundColor="";let{svg:g,path:b}=this.ensureSvgPath(e);g.setAttribute("width",String(p)),g.setAttribute("height",String(u)),b.setAttribute("stroke",a),b.setAttribute("stroke-width",String(2));let D=this._ctx.getHeaderPosition(),w=o?D==="right":D==="bottom";b.setAttribute("d",this._wrappedPathData(s,o,w,l,c,2))}_computeWrappedRuns(e,t,i,n){let o=[],r;for(let s of e.panelIds){var a;let d=i.get(s);if(!d)continue;let l=d.value.element.getBoundingClientRect();if(l.width===0&&l.height===0)continue;let h=l.top-t.top,c=l.bottom-t.top,v=l.left-t.left,p=l.right-t.left,u=n?v:h,g=o.find(b=>Math.abs((n?b.left:b.top)-u)<=2);g?(g.top=Math.min(g.top,h),g.bottom=Math.max(g.bottom,c),g.left=Math.min(g.left,v),g.right=Math.max(g.right,p)):(g={top:h,bottom:c,left:v,right:p},o.push(g)),(a=r)!==null&&a!==void 0||(r=g)}return{runs:o,firstRun:r}}_wrappedPathData(e,t,i,n,o,r){let a="";for(let s of e)if(t){let d=i?s.right-n-r/2:s.left-n+r/2;a+=`M ${d},${s.top} L ${d},${s.bottom} `}else{let d=i?s.top-o+r/2:s.bottom-o-r/2;a+=`M ${s.left},${d} L ${s.right},${d} `}return a.trim()}_positionContinuationMarkers(e,t,i,n,o){let r=t.filter(s=>s!==i),a=this._syncContinuationMarkers(e,r.length);r.forEach((s,d)=>{let l=a[d];if(l.style.backgroundColor=n,o){let h=(s.left+s.right)/2;l.style.left=`${h-Ci/2}px`,l.style.top=`${s.top}px`}else{let h=(s.top+s.bottom)/2;l.style.left=`${s.left}px`,l.style.top=`${h-Ci/2}px`}})}ensureSvgPath(e){let t=e.firstElementChild;if(t?.tagName==="svg")return{svg:t,path:t.firstElementChild};e.replaceChildren();let i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.style.display="block";let n=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("fill","none"),i.appendChild(n),e.appendChild(i),{svg:i,path:n}}},So=class extends Si{_applyStraightLine(e,t,i,n,o,r,a){let s=a?o:n,d=a?n:o;e.setAttribute("width",String(s)),e.setAttribute("height",String(d)),i.style.width=`${s}px`,i.style.height=`${d}px`,t.setAttribute("d",a?`M ${r},0 L ${r},${n}`:`M 0,${r} L ${n},${r}`)}applyShape(e,t,i,n,o,r,a,s){let l=o,h=n,c=Be(t.color,this._ctx.getColorPalette());if(h<=0||l<=0||c===void 0){e.style.display="none";return}e.style.display="";let v;r&&t.panelIds.includes(r)&&(v=this._ctx.getTabMap().get(r));let{svg:p,path:u}=this.ensureSvgPath(e);u.setAttribute("stroke",c),u.setAttribute("stroke-width",String(2));let g=2,b=this._ctx.getHeaderPosition(),D=!s&&b==="bottom",w=s&&b==="right",_,S;if(s?(_=w?l-g:g,S=w?g:l-g):(_=D?g:l-g,S=D?l-g:g),!v){this._applyStraightLine(p,u,e,h,l,_,s);return}let T=v.value.element.getBoundingClientRect(),y,P;if(s?(y=Math.max(0,T.top-a.top-i),P=Math.min(h,T.bottom-a.top-i)):(y=Math.max(0,T.left-a.left-i),P=Math.min(h,T.right-a.left-i)),P<=y){this._applyStraightLine(p,u,e,h,l,_,s);return}let A=6,O=S>_?1:-1;if(s){let z=l,I=h;p.setAttribute("width",String(z)),p.setAttribute("height",String(I)),e.style.width=`${z}px`,e.style.height=`${I}px`;let W=[`M ${_},0`,`L ${_},${y-A}`,`Q ${_},${y} ${_+O*A},${y}`,`L ${S-O*A},${y}`,`Q ${S},${y} ${S},${y+A}`,`L ${S},${P-A}`,`Q ${S},${P} ${S-O*A},${P}`,`L ${_+O*A},${P}`,`Q ${_},${P} ${_},${P+A}`,`L ${_},${I}`].join(" ");u.setAttribute("d",W)}else{let z=h,I=l;p.setAttribute("width",String(z)),p.setAttribute("height",String(I)),e.style.width=`${z}px`,e.style.height=`${I}px`;let W=[`M 0,${_}`,`L ${y-A},${_}`,`Q ${y},${_} ${y},${_+O*A}`,`L ${y},${S-O*A}`,`Q ${y},${S} ${y+A},${S}`,`L ${P-A},${S}`,`Q ${P},${S} ${P},${S-O*A}`,`L ${P},${_+O*A}`,`Q ${P},${_} ${P+A},${_}`,`L ${z},${_}`].join(" ");u.setAttribute("d",W)}}},ko=class extends Si{applyShape(e,t,i,n,o,r,a,s){let l=Be(t.color,this._ctx.getColorPalette());if(n<=0||l===void 0){e.style.display="none";return}e.style.display="",e.firstElementChild&&e.replaceChildren(),e.style.backgroundColor=l,s?(e.style.width="2px",e.style.height=`${n}px`):(e.style.width=`${n}px`,e.style.height="2px")}};let Go=new Map;var zo=class{get chipRenderers(){return this._chipRenderers}get groupUnderlines(){var e,t;return(e=(t=this._indicator)===null||t===void 0?void 0:t.underlines)!==null&&e!==void 0?e:Go}get skipNextCollapseAnimation(){return this._skipNextCollapseAnimation}set skipNextCollapseAnimation(e){this._skipNextCollapseAnimation=e}constructor(e,t){this._ctx=e,this._callbacks=t,this._chipRenderers=new Map,this._indicator=null,this._skipNextCollapseAnimation=!1,this._pendingTransitionCleanups=new Map}update(){let e=this._ctx.group.model.getTabGroups(),t=new Set;for(let n of e)t.add(n.id),this._ensureChipForGroup(n),this._positionChipForGroup(n);for(let[n,o]of this._chipRenderers)if(!t.has(n)){var i;o.chip.element.remove(),o.chip.dispose(),(i=o.dragSourcesDisposable)===null||i===void 0||i.dispose(),o.disposable.dispose(),this._chipRenderers.delete(n)}this._updateTabGroupClasses()}refreshAccents(){for(let i of this._ctx.group.model.getTabGroups()){var e,t;let n=this._chipRenderers.get(i.id);n==null||(t=(e=n.chip).update)===null||t===void 0||t.call(e,{tabGroup:i})}this._updateTabGroupClasses()}positionAllChips(){if(this._chipRenderers.size!==0)for(let e of this._ctx.group.model.getTabGroups())this._positionChipForGroup(e)}updateDirection(){let e=this._ctx.getDirection()==="vertical";for(let[,t]of this._chipRenderers){let i=e?["top"]:["left"];t.dropTarget.setTargetZones(i),t.pointerDropTarget.setTargetZones(i)}}clearChipDropOverlays(){for(let[,i]of this._chipRenderers){var e,t;(e=i.dropTarget)===null||e===void 0||e.clearOverlay(),(t=i.pointerDropTarget)===null||t===void 0||t.clearOverlay()}}snapshotChipWidths(){let e=new Map;for(let[t,i]of this._chipRenderers)e.set(t,i.chip.element.getBoundingClientRect().width);return e}positionUnderlines(){var e;(e=this._indicator)===null||e===void 0||e.positionUnderlines()}trackUnderlines(){var e;(e=this._indicator)===null||e===void 0||e.trackUnderlines()}setGroupDragImage(e,t,i){if(!e.dataTransfer)return;let n=this._ctx.getDirection()==="vertical",o=this._ctx.tabsList.cloneNode(!0);n?(o.classList.remove("dv-tabs-container-vertical","dv-vertical"),o.classList.add("dv-horizontal"),o.style.writingMode="horizontal-tb",o.style.height=`${this._ctx.tabsList.offsetWidth}px`):o.style.height=`${this._ctx.tabsList.offsetHeight}px`,o.style.width="auto",o.style.overflow="visible",o.style.pointerEvents="none";let r=Array.from(o.children),a=Array.from(this._ctx.tabsList.children);for(let p=r.length-1;p>=0;p--)a[p]!==i&&r[p].remove();let s=document.createElement("div");s.className="dv-groupview dv-active-group",s.style.position="fixed",s.style.top="-10000px",s.style.left="0px",s.style.height="auto",s.style.width="auto",s.style.pointerEvents="none";let d=document.createElement("div");d.className="dv-tabs-and-actions-container",d.style.height="auto",d.style.width="auto",s.appendChild(d),d.appendChild(o),this._ctx.accessor.element.appendChild(s);let l=o.querySelector(".dv-tab-group-chip"),h=i.getBoundingClientRect(),c=e.clientX-h.left,v=e.clientY-h.top;if(l){let p=l.getBoundingClientRect(),u=s.getBoundingClientRect(),g=p.left-u.left+c,b=p.top-u.top+v;e.dataTransfer.setDragImage(s,g,b)}else e.dataTransfer.setDragImage(s,c,v);requestAnimationFrame(()=>{s.remove()})}cleanupTransition(e){var t;(t=this._pendingTransitionCleanups.get(e))===null||t===void 0||t(),this._pendingTransitionCleanups.delete(e)}updateDragAndDropState(){let e=he(this._ctx.accessor.options);for(let o of this._chipRenderers.values()){var t,i,n;o.chip.element.draggable=e.html5,(t=o.html5DragSource)===null||t===void 0||t.setDisabled(!e.html5),(i=o.pointerDragSource)===null||i===void 0||i.setDisabled(!e.pointer),(n=o.pointerDragSource)===null||n===void 0||n.setTouchOnly(!e.pointerHandlesMouse)}}disposeChipDrag(e){var t;let i=this._chipRenderers.get(e);i&&((t=i.dragSourcesDisposable)===null||t===void 0||t.dispose(),i.html5DragSource=void 0,i.pointerDragSource=void 0,i.dragSourcesDisposable=void 0)}_buildChipGhostElement(e){let t=getComputedStyle(e),i=e.cloneNode(!0);return Array.from(t).forEach(n=>{i.style.setProperty(n,t.getPropertyValue(n),t.getPropertyPriority(n))}),i.style.position="absolute",i}disposeAll(){var e;(e=this._indicator)===null||e===void 0||e.dispose(),this._indicator=null;for(let[,i]of this._pendingTransitionCleanups)i();this._pendingTransitionCleanups.clear();for(let[,i]of this._chipRenderers){var t;i.chip.element.remove(),i.chip.dispose(),(t=i.dragSourcesDisposable)===null||t===void 0||t.dispose(),i.disposable.dispose()}this._chipRenderers.clear()}_ensureIndicator(){var e,t,i;let n=((e=(t=this._ctx.accessor.options.theme)===null||t===void 0?void 0:t.tabGroupIndicator)!==null&&e!==void 0?e:"wrap")==="none"?ko:So;this._indicator&&!(this._indicator instanceof n)&&(this._indicator.dispose(),this._indicator=null),(i=this._indicator)!==null&&i!==void 0||(this._indicator=new n({tabsList:this._ctx.tabsList,getTabGroups:()=>this._ctx.group.model.getTabGroups(),getActivePanelId:()=>{var o;return(o=this._ctx.group.activePanel)===null||o===void 0?void 0:o.id},getTabMap:()=>this._ctx.getTabMap(),getChipElement:o=>{var r;return(r=this._chipRenderers.get(o))===null||r===void 0?void 0:r.chip.element},getDirection:()=>this._ctx.getDirection(),getHeaderPosition:()=>this._ctx.group.model.headerPosition,getColorPalette:()=>this._ctx.accessor.tabGroupColorPalette}))}_createChipDragSources(e,t){let i=he(this._ctx.accessor.options);e.element.draggable=i.html5;let n=ue.getInstance(),o=()=>(n.setData([new J(this._ctx.accessor.id,this._ctx.group.id,null,t.id)],J.prototype),{dispose:()=>{n.clearData(J.prototype)}}),r=ge.createDragSource(e.element,{getData:o,disabled:!i.html5,isCancelled:()=>!he(this._ctx.accessor.options).html5,onDragStart:d=>{"dataTransfer"in d&&d.dataTransfer&&this.setGroupDragImage(d,t,e.element),this._callbacks.onChipDragStart(t,e,d)},onDragEnd:d=>{var l,h;(l=(h=this._callbacks).onChipDragEnd)===null||l===void 0||l.call(h,t,e,d)}}),a=()=>{n.clearData(J.prototype)};e.element.addEventListener("dragend",a,{once:!0});let s=le.createDragSource(e.element,{getData:o,disabled:!i.pointer,touchOnly:!i.pointerHandlesMouse,isCancelled:()=>!he(this._ctx.accessor.options).pointer,createGhost:()=>({element:this._buildChipGhostElement(e.element),offsetX:8,offsetY:8}),onDragStart:d=>{this._callbacks.onChipDragStart(t,e,d)}});return{html5DragSource:r,pointerDragSource:s,disposable:{dispose:()=>{r.dispose(),s.dispose(),e.element.removeEventListener("dragend",a)}}}}_ensureChipForGroup(e){let t=this._chipRenderers.get(e.id);if(t){if(!t.html5DragSource){let v=this._createChipDragSources(t.chip,e);t.html5DragSource=v.html5DragSource,t.pointerDragSource=v.pointerDragSource,t.dragSourcesDisposable=v.disposable}return}let i=this._ctx.accessor.options.createTabGroupChipComponent,n=i?i(e):new yi(this._ctx.accessor.tabGroupColorPalette);n.init({tabGroup:e,api:this._ctx.accessor.api});let o=this._createChipDragSources(n,e),r=[e.onDidChange(()=>{var v;(v=n.update)===null||v===void 0||v.call(n,{tabGroup:e}),this._updateTabGroupClasses()}),e.onDidPanelChange(()=>{this._positionChipForGroup(e),this._updateTabGroupClasses()}),e.onDidCollapseChange(()=>{this._updateTabGroupClasses()})],a=v=>{var p;(p=this._chipRenderers.get(e.id))===null||p===void 0||(p=p.pointerDragSource)===null||p===void 0||p.cancelPending(),this._callbacks.onChipContextMenu(e,v)};n instanceof yi?r.push(n.onContextMenu(a)):r.push(new wt(n.element,{onLongPress:a}),C(n.element,"contextmenu",a));let s={acceptedTargetZones:this._ctx.getDirection()==="vertical"?["top"]:["left"],overlayModel:{activationSize:{value:100,type:"percentage"}},canDisplayOverlay:(v,p)=>{if(this._ctx.group.locked||this._ctx.accessor.options.disableDnd)return!1;let u=$();if(this._ctx.accessor.id===u?.viewId){var g;return!(((g=this._ctx.accessor.options.theme)===null||g===void 0?void 0:g.tabAnimation)==="smooth"&&!u.tabGroupId)}return this._ctx.group.model.canDisplayOverlay(v,p,"tab")}},d=ge.createDropTarget(n.element,s),l=le.createDropTarget(n.element,s),h=v=>{this._callbacks.onChipDrop(e,v)};r.push(d,d.onDrop(h),l,l.onDrop(h));let c=new k(...r);this._chipRenderers.set(e.id,{chip:n,html5DragSource:o.html5DragSource,pointerDragSource:o.pointerDragSource,dragSourcesDisposable:o.disposable,disposable:c,dropTarget:d,pointerDropTarget:l}),e.collapsed&&(this._skipNextCollapseAnimation=!0)}_positionChipForGroup(e){let t=this._chipRenderers.get(e.id);if(!t)return;let i=t.chip.element,n=e.panelIds;if(n.length===0){i.remove();return}let o=n[0],r=this._ctx.getTabMap().get(o);if(!r){i.remove();return}let a=r.value.element;i.nextSibling!==a&&this._ctx.tabsList.insertBefore(i,a)}_updateTabGroupClasses(){let e=this._ctx.group.model.getTabGroups(),t=this._ctx.getTabs(),i=this._ctx.getTabMap(),n=!1,o=new Map;for(let s of e)for(let d of s.panelIds)o.set(d,s);for(let s of t){let d=s.value,l=d.panel.id,h=o.get(l),c=!!h;if(x(d.element,"dv-tab--grouped",c),h){let v=h.panelIds,p=v[0]===l,u=v[v.length-1]===l;x(d.element,"dv-tab--group-first",p),x(d.element,"dv-tab--group-last",u),Fe(d.element,h.color,this._ctx.accessor.tabGroupColorPalette);let g=d.element.classList.contains("dv-tab--group-collapsed");if(!h.collapsed&&g){var r;n=!0,d.element.classList.remove("dv-tab--group-collapsed"),d.element.classList.add("dv-tab--group-expanding"),(r=this._pendingTransitionCleanups.get(l))===null||r===void 0||r();let b=()=>{d.element.classList.remove("dv-tab--group-expanding"),d.element.style.removeProperty("width"),d.element.removeEventListener("transitionend",b),clearTimeout(D),this._pendingTransitionCleanups.delete(l)},D=setTimeout(b,300);this._pendingTransitionCleanups.set(l,b),d.element.addEventListener("transitionend",b)}}else x(d.element,"dv-tab--group-first",!1),x(d.element,"dv-tab--group-last",!1),d.element.classList.remove("dv-tab--group-collapsed","dv-tab--group-expanding"),d.element.style.removeProperty("width"),d.element.style.removeProperty("--dv-tab-group-color")}let a=new Set;for(let s of e)if(a.add(s.id),s.collapsed&&s.panelIds.some(d=>{let l=i.get(d);return l&&!l.value.element.classList.contains("dv-tab--group-collapsed")}))if(this._skipNextCollapseAnimation){let d=[];for(let l of s.panelIds){let h=i.get(l);h&&(h.value.element.style.transition="none",h.value.element.classList.add("dv-tab--group-collapsed"),d.push(h.value.element))}if(d.length>0){d[0].offsetHeight;for(let l of d)l.style.removeProperty("transition")}}else{n=!0;let d=this._ctx.getDirection()==="vertical";for(let l of s.panelIds){let h=i.get(l);if(h&&!h.value.element.classList.contains("dv-tab--group-collapsed")){let c=h.value.element.getBoundingClientRect();d?h.value.element.style.height=`${c.height}px`:h.value.element.style.width=`${c.width}px`,h.value.element.offsetHeight,h.value.element.classList.add("dv-tab--group-collapsed")}}}this._skipNextCollapseAnimation=!1,this._ensureIndicator(),this._indicator&&(this._indicator.syncUnderlineElements(a),n?this._indicator.trackUnderlines():this._indicator.positionUnderlines())}},Po=class extends k{get _tabs(){return this.host.tabItems}get _tabMap(){return this.host.tabMap}get _tabsList(){return this.host.tabsList}get _direction(){return this.host.direction}get group(){return this.host.groupPanel}get accessor(){return this.host.component}get _tabGroupManager(){return this.host.tabGroupManager}get _wrapMode(){return this._tabsList.classList.contains(Dt)}get animState(){return this._animState}set animState(e){this._animState=e}get pendingCollapse(){return this._pendingCollapse}set pendingCollapse(e){this._pendingCollapse=e}set voidContainerElement(e){this._voidContainer=e}constructor(e){super(),this.host=e,this._animState=null,this._pendingMarginCleanups=new Map,this._pendingCollapse=!1,this._flipTransitionCleanup=null,this._voidContainer=null,this._extendedDropZone=null,this._pointerInsideTabsList=!1,this._wrapIndicatorEl=null,this.addDisposables({dispose:()=>{var t;(t=this._flipTransitionCleanup)===null||t===void 0||t.call(this)}})}setExtendedDropZone(e){this._extendedDropZone=e}setExternalInsertionIndex(e){this._animState&&e!==this._animState.currentInsertionIndex&&(this._animState.currentInsertionIndex=e,this.applyDragOverTransforms())}clearExternalAnimState(){this._animState&&(this.resetTabTransforms(),this._animState.sourceIndex===-1?this._animState=null:this._animState.currentInsertionIndex=null)}snapshotTabPositions(){let e=new Map;for(let t of this._tabs)e.set(t.value.panel.id,t.value.element.getBoundingClientRect());return e}getAverageTabWidth(){if(this._tabs.length===0)return 0;let e=this._direction==="vertical",t=0;for(let i of this._tabs){let n=i.value.element.getBoundingClientRect();t+=e?n.height:n.width}return t/this._tabs.length}handlePointerDragMove(e,t){var i;let n=((i=this._tabsList.ownerDocument)!==null&&i!==void 0?i:document).elementFromPoint(e,t);if(!(n&&(this._tabsList.contains(n)||this._extendedDropZone&&this._extendedDropZone.contains(n)))){this._pointerInsideTabsList&&(this._pointerInsideTabsList=!1,this.processDragLeave(n));return}this._pointerInsideTabsList=!0,this.processDragOver(e,t)}handlePointerDragEnd(e){if(e&&this._animState&&this._animState.sourceIndex!==-1&&this._animState.currentInsertionIndex!==null&&this.isPointInsideTabsList(e.clientX,e.clientY)){let t=this._animState.sourceTabGroupId;if(t){let i=this._animState.currentInsertionIndex;this._animState=null,this.commitGroupMove(t,i)}else this.commitPointerReorder(e.pointerEvent)}this._pointerInsideTabsList=!1,this.resetDragAnimation()}isPointInsideTabsList(e,t){var i;let n=((i=this._tabsList.ownerDocument)!==null&&i!==void 0?i:document).elementFromPoint(e,t);return!!n&&this._tabsList.contains(n)}commitPointerReorder(e){let t=this._animState;if(t?.currentInsertionIndex==null)return;let i=t.currentInsertionIndex,n=t.sourceIndex,o=i-(n!==-1&&n<i?1:0);this._animState=null,this.clearWrapDropIndicator(),this.uncollapseSourceTab(t.sourceTabId),o!==n&&this.host.fireDrop({event:e,index:o,targetTabGroupId:null})}processDragOver(e,t){if(this.accessor.options.disableDnd||(this._dropStaleAnimState(),!this._animState&&!this._initAnimStateForExternalDrag()))return!1;if(this._animState.sourceIndex!==-1){var i;(i=this.group.model.dropTargetContainer)===null||i===void 0||(i=i.model)===null||i===void 0||i.clear()}return this.handleDragOver({clientX:e,clientY:t}),!0}_dropStaleAnimState(){if(!this._animState)return;let e=$();e?.tabGroupId&&e.groupId!==this.group.id&&this._animState.sourceTabGroupId!==e.tabGroupId&&(this._animState=null)}_initAnimStateForExternalDrag(){var e;let t=$();if(((e=this.accessor.options.theme)===null||e===void 0?void 0:e.tabAnimation)==="default"&&!t?.tabGroupId||!t||!(t.panelId||t.tabGroupId)||t.groupId===this.group.id)return!1;let i=this.getAverageTabWidth();return this._animState=t.tabGroupId?this._makeGroupDragAnimState(t,i):this._makeTabDragAnimState(t,i),!0}_makeGroupDragAnimState(e,t){var i;let n=this.accessor.getPanel(e.groupId),o=n?.model.getTabGroups().find(a=>a.id===e.tabGroupId),r=t*((i=o?.panelIds.length)!==null&&i!==void 0?i:1)+t;return{sourceTabId:"",sourceIndex:-1,tabPositions:this.snapshotTabPositions(),chipPositions:this._tabGroupManager.snapshotChipWidths(),currentInsertionIndex:null,targetTabGroupId:null,sourceTabGroupId:e.tabGroupId,sourceGroupPanelIds:o?new Set(o.panelIds):new Set,sourceChipWidth:t,cursorOffsetFromDragLeft:r/2,sourceGapWidth:r,containerLeft:this._tabsList.getBoundingClientRect().left}}_makeTabDragAnimState(e,t){return{sourceTabId:e.panelId,sourceIndex:-1,tabPositions:this.snapshotTabPositions(),chipPositions:this._tabGroupManager.snapshotChipWidths(),currentInsertionIndex:null,targetTabGroupId:null,sourceTabGroupId:null,sourceGroupPanelIds:null,sourceChipWidth:0,cursorOffsetFromDragLeft:t/2,sourceGapWidth:t,containerLeft:this._tabsList.getBoundingClientRect().left}}processDragLeave(e){var t;if(this._animState&&!(e&&this._tabsList.contains(e))){if(e&&(!((t=this._extendedDropZone)===null||t===void 0)&&t.contains(e))){this.resetTabTransforms(),this._animState.currentInsertionIndex=null;return}this._voidContainer&&e&&(e===this._voidContainer||this._voidContainer.contains(e))||(this.resetTabTransforms(),this._animState.sourceIndex===-1?(this.clearHeaderAnchorOverlay(),this._animState=null):this._animState.currentInsertionIndex=null)}}clearHeaderAnchorOverlay(){var e;let t=this.group.model.dropTargetContainer,i=t?.renderedOutline;i&&![this._tabsList,this._voidContainer,this._extendedDropZone].some(n=>n?.contains(i))||t==null||(e=t.model)===null||e===void 0||e.clear()}handleDragOver(e){var t;if(!this._animState)return;if(this._wrapMode&&!this._animState.sourceTabGroupId){var i;this.handleWrappedDragOver(e.clientX,(i=e.clientY)!==null&&i!==void 0?i:0);return}let n=e.clientX,o=this._buildFirstPanelToGroupMap(),r=this._computeDragOverInsertionIndex(n,o),a=null;if(r!==null&&this._tabGroupManager.chipRenderers.size>0){let s=this._resolveInsertionAgainstTabGroups(n,r,o);r=s.insertionIndex,a=s.targetTabGroupId}r===this._animState.currentInsertionIndex&&a===this._animState.targetTabGroupId||(this._animState.currentInsertionIndex=r,this._animState.targetTabGroupId=a,((t=this.accessor.options.theme)===null||t===void 0?void 0:t.tabAnimation)==="smooth"&&this.applyDragOverTransforms())}_buildFirstPanelToGroupMap(){let e=new Map;if(this._tabGroupManager.chipRenderers.size===0)return e;for(let t of this.group.model.getTabGroups())t.id!==this._animState.sourceTabGroupId&&t.panelIds.length>0&&e.set(t.panelIds[0],t.id);return e}_computeDragOverInsertionIndex(e,t){let i=this._animState,n=i.sourceGroupPanelIds,o=e-i.cursorOffsetFromDragLeft-i.containerLeft,r=0,a=null;for(let h=0;h<this._tabs.length;h++){let c=this._tabs[h].value;if(c.panel.id===i.sourceTabId||n?.has(c.panel.id))continue;let v=t.get(c.panel.id);if(v){var s;let g=(s=i.chipPositions.get(v))!==null&&s!==void 0?s:0;if(r+g>o){var d;(d=a)!==null&&d!==void 0||(a=h);break}r+=g}let p=i.tabPositions.get(c.panel.id),u=p?p.width:c.element.getBoundingClientRect().width;if(r+u/2<=o)r+=u,a=h+1;else{var l;(l=a)!==null&&l!==void 0||(a=h);break}}return a}_accumulatedWidthUpTo(e,t){let i=this._animState,n=i.sourceGroupPanelIds,o=0;for(let a=0;a<this._tabs.length;a++){let s=this._tabs[a].value;if(s.panel.id===i.sourceTabId||n?.has(s.panel.id))continue;if(a>=e)break;let d=t.get(s.panel.id);if(d){var r;o+=(r=i.chipPositions.get(d))!==null&&r!==void 0?r:0}let l=i.tabPositions.get(s.panel.id);o+=l?l.width:s.element.getBoundingClientRect().width}return o}_resolveInsertionAgainstTabGroups(e,t,i){let n=!!this._animState.sourceTabGroupId,o=this._accumulatedWidthUpTo(t,i);for(let r of this.group.model.getTabGroups()){let a=this._evaluateTabGroupForInsertion(r,e,t,o,n);if(a)return a}return{insertionIndex:t,targetTabGroupId:null}}_evaluateTabGroupForInsertion(e,t,i,n,o){let r=this._resolveGroupRange(e);if(!r)return null;let{firstIdx:a,lastIdx:s}=r,d=i>=a&&i<=s,l=!d&&i===a-1;return!d&&!l?null:o?this._resolveGroupDragTarget(i,a,s,d):this._resolveTabDragTarget(e,t,i,n,a,l)}_resolveGroupRange(e){let t=this._animState,i=t.sourceGroupPanelIds,n=e.panelIds.filter(a=>a!==t.sourceTabId&&!i?.has(a));if(n.length===0)return null;let o=this._tabs.findIndex(a=>a.value.panel.id===n[0]),r=this._tabs.findIndex(a=>a.value.panel.id===n[n.length-1]);return o===-1||r===-1?null:{firstIdx:o,lastIdx:r}}_resolveGroupDragTarget(e,t,i,n){return n?{insertionIndex:e<(t+i+1)/2?t:i+1,targetTabGroupId:null}:{insertionIndex:e,targetTabGroupId:null}}_resolveTabDragTarget(e,t,i,n,o,r){var a;let s=this._animState,d=(a=s.chipPositions.get(e.id))!==null&&a!==void 0?a:0;if(r)return this._onlySourceBetween(i,o)?t>=(e.collapsed?s.containerLeft+n+d/2:s.containerLeft+n+d)?{insertionIndex:o,targetTabGroupId:e.id}:{insertionIndex:i,targetTabGroupId:null}:null;let l=s.containerLeft+n+d;return i===o?{insertionIndex:i,targetTabGroupId:t>=l?e.id:null}:{insertionIndex:i,targetTabGroupId:e.id}}_onlySourceBetween(e,t){let i=this._animState;for(let o=e;o<t;o++){var n;let r=this._tabs[o].value.panel.id;if(r!==i.sourceTabId&&!(!((n=i.sourceGroupPanelIds)===null||n===void 0)&&n.has(r)))return!1}return!0}handleWrappedDragOver(e,t){if(!this._animState)return;let i=this.computeWrappedInsertionIndex(e,t);i===this._animState.currentInsertionIndex&&this._animState.targetTabGroupId===null||(this._animState.currentInsertionIndex=i,this._animState.targetTabGroupId=null,this.updateWrapDropIndicator(i))}computeWrappedInsertionIndex(e,t){var i;let n=this._direction==="vertical",o=this._wrappedDragEntries();if(o.length===0)return this._tabs.length;let r=n?e:t,a=n?t:e,s=p=>n?p.left:p.top,d=p=>n?p.right:p.bottom,l=p=>n?p.top:p.left,h=p=>n?p.height:p.width,c=this._bucketWrappedLines(o,s,d),v=[...((i=c.find(p=>r>=p.start&&r<=p.end))!==null&&i!==void 0?i:this._nearestWrappedLine(c,r)).items].sort((p,u)=>l(p.rect)-l(u.rect));for(let p of v)if(a<l(p.rect)+h(p.rect)/2)return p.index;return v[v.length-1].index+1}_wrappedDragEntries(){var e,t;let i=(e=this._animState)===null||e===void 0?void 0:e.sourceTabId,n=(t=this._animState)===null||t===void 0?void 0:t.sourceGroupPanelIds,o=[];for(let r=0;r<this._tabs.length;r++){let a=this._tabs[r].value;a.panel.id!==i&&(n?.has(a.panel.id)||o.push({index:r,rect:a.element.getBoundingClientRect()}))}return o}_bucketWrappedLines(e,t,i){let n=[];for(let o of e){let r=t(o.rect),a=n.find(s=>Math.abs(s.start-r)<=2);a?(a.items.push(o),a.end=Math.max(a.end,i(o.rect))):n.push({start:r,end:i(o.rect),items:[o]})}return n.sort((o,r)=>o.start-r.start),n}_nearestWrappedLine(e,t){let i=n=>t<n.start?n.start-t:t-n.end;return e.reduce((n,o)=>i(o)<i(n)?o:n,e[0])}updateWrapDropIndicator(e){var t;this.clearWrapDropIndicator();let i=this._tabs.length;if(i===0)return;let n=(t=this._animState)===null||t===void 0?void 0:t.sourceTabId;if(e<i){let o=this._tabs[e].value.element;if(this._tabs[e].value.panel.id===n)return;o.classList.add("dv-tab--reorder-before"),this._wrapIndicatorEl=o}else{let o=this._tabs[i-1].value.element;o.classList.add("dv-tab--reorder-after"),this._wrapIndicatorEl=o}}clearWrapDropIndicator(){var e;(e=this._wrapIndicatorEl)===null||e===void 0||e.classList.remove("dv-tab--reorder-before","dv-tab--reorder-after"),this._wrapIndicatorEl=null}_removeClassInstantlyBatch(e,t){let i=[];for(let n of e)n.classList.contains(t)&&(n.style.transition="none",x(n,t,!1),i.push(n));if(i.length>0){i[0].getBoundingClientRect();for(let n of i)n.style.removeProperty("transition")}}uncollapseSourceTab(e){let t=this._tabMap.get(e);t&&this._removeClassInstantlyBatch([t.value.element],"dv-tab--dragging")}applyDragOverTransforms(e=!1){var t;if(this._wrapMode)return;if(((t=this._animState)===null||t===void 0?void 0:t.currentInsertionIndex)==null){this.resetTabTransforms();return}if(this._pendingCollapse)return;let i=this._animState.currentInsertionIndex,n=this._computeGapWidth(),o=this._computeChipToShift(i);this._applyGapMargins(i,n,o,e)}_computeGapWidth(){let e=this._animState;if(e.sourceTabGroupId&&e.sourceGroupPanelIds)return e.sourceGapWidth;let t=e.tabPositions.get(e.sourceTabId);return t?t.width:this.getAverageTabWidth()}_computeChipToShift(e){if(this._tabGroupManager.chipRenderers.size===0)return null;for(let t of this.group.model.getTabGroups()){let i=this._chipToShiftForGroup(t,e);if(i!==void 0)return i}return null}_chipToShiftForGroup(e,t){let i=this._animState;if(e.id===i.sourceTabGroupId||e.panelIds.includes(i.sourceTabId))return;let n=e.panelIds.filter(r=>{var a;return r!==i.sourceTabId&&!(!((a=i.sourceGroupPanelIds)===null||a===void 0)&&a.has(r))});if(n.length===0)return;let o=this._tabs.findIndex(r=>r.value.panel.id===n[0]);if((!i.targetTabGroupId||i.targetTabGroupId===e.id&&e.collapsed)&&!(o<t)){if(this._onlySourceBetween(t,o)){let r=this._tabGroupManager.chipRenderers.get(e.id);if(r)return r.chip.element}return null}}_applyGapMargins(e,t,i,n){let o=this._animState,r=o.sourceGroupPanelIds,a=!1;for(let[s,d]of this._tabGroupManager.chipRenderers)s!==o.sourceTabGroupId&&this._clearMargin(d.chip.element,n);i&&(this._setMargin(i,`${t}px`,n),a=!0);for(let s=0;s<this._tabs.length;s++){let d=this._tabs[s].value;d.panel.id!==o.sourceTabId&&(r?.has(d.panel.id)||(!a&&s>=e?(this._setMargin(d.element,`${t}px`,n),a=!0):this._clearMargin(d.element,n)))}this._tabGroupManager.trackUnderlines()}_shiftingClass(e){return e.classList.contains("dv-tab-group-chip")?"dv-tab-group-chip--shifting":"dv-tab--shifting"}_setMargin(e,t,i){i?(e.style.transition="none",e.style.marginLeft=t,e.getBoundingClientRect(),e.style.removeProperty("transition")):e.style.marginLeft=t,x(e,this._shiftingClass(e),!0)}_clearMargin(e,t){let i=this._shiftingClass(e),n=this._pendingMarginCleanups.get(e);if(n&&n(),t||!e.style.marginLeft)e.style.removeProperty("margin-left"),x(e,i,!1);else{e.style.marginLeft="0px",x(e,i,!0);let o=()=>{e.style.removeProperty("margin-left"),x(e,i,!1),e.removeEventListener("transitionend",o),clearTimeout(r),this._pendingMarginCleanups.delete(e)},r=setTimeout(o,300);this._pendingMarginCleanups.set(e,o),e.addEventListener("transitionend",o)}}resetTabTransforms(){this.clearWrapDropIndicator();for(let[,e]of this._pendingMarginCleanups)e();this._pendingMarginCleanups.clear();for(let e of this._tabs)e.value.element.style.removeProperty("margin-left"),e.value.element.style.removeProperty("margin-right"),e.value.element.style.removeProperty("margin-top"),e.value.element.style.removeProperty("margin-bottom"),e.value.element.style.removeProperty("transform"),x(e.value.element,"dv-tab--shifting",!1);for(let[,e]of this._tabGroupManager.chipRenderers)e.chip.element.style.removeProperty("margin-left"),x(e.chip.element,"dv-tab-group-chip--shifting",!1);this._tabGroupManager.positionUnderlines()}commitGroupMove(e,t){let i=$();if(this._tabGroupManager.disposeChipDrag(e),this._tabGroupManager.clearChipDropOverlays(),this.group.model.getTabGroups().some(r=>r.id===e)){var n;if(((n=this.accessor.options.theme)===null||n===void 0?void 0:n.tabAnimation)==="smooth"){this._clearGroupDragClasses(e);let r=this.snapshotTabPositions();this.resetTabTransforms(),this.group.model.moveTabGroup(e,t),this.runFlipAnimation(r,"",!1)}else this._tabGroupManager.skipNextCollapseAnimation=!0,this.group.model.moveTabGroup(e,t)}else if(i){var o;this.resetTabTransforms(),this.accessor.moveGroupOrPanel({from:{groupId:i.groupId,tabGroupId:(o=i.tabGroupId)!==null&&o!==void 0?o:e},to:{group:this.group,position:"center",index:t}})}}_clearGroupDragClasses(e){let t=this._tabGroupManager.chipRenderers.get(e);t&&this._removeClassInstantlyBatch([t.chip.element],"dv-tab-group-chip--dragging"),this._removeClassInstantlyBatch(this._tabs.map(n=>n.value.element),"dv-tab--dragging");let i=this._tabGroupManager.groupUnderlines.get(e);i&&i.style.removeProperty("display"),this._tabGroupManager.skipNextCollapseAnimation=!0}resetDragAnimation(){if(this._pendingCollapse=!1,this._animState){this.resetTabTransforms(),this._animState.sourceTabGroupId?this._clearGroupDragClasses(this._animState.sourceTabGroupId):this._removeClassInstantlyBatch(this._tabs.map(e=>e.value.element),"dv-tab--dragging"),this._animState=null;for(let[,e]of this._tabGroupManager.groupUnderlines)e.style.removeProperty("display")}}runFlipAnimation(e,t,i=!1,n){if(this._wrapMode)return;let o=!1;for(let r=0;r<this._tabs.length;r++)this._applyFlipTransform(this._tabs[r],r,t,i,e,n)&&(o=!0);o&&this._scheduleFlipReset()}_applyFlipTransform(e,t,i,n,o,r){let a=this._direction==="vertical",s=e.value.panel.id;if(s===i){if(!n)return!1;let c=e.value.element.getBoundingClientRect();return e.value.element.style.transform=a?`translateY(${c.height}px)`:`translateX(${c.width}px)`,x(e.value.element,"dv-tab--shifting",!0),!0}if(r!==void 0&&(t<r.from||t>r.to))return!1;let d=o.get(s);if(!d)return!1;let l=e.value.element.getBoundingClientRect(),h=a?d.top-l.top:d.left-l.left;return Math.abs(h)<1?!1:(e.value.element.style.transform=a?`translateY(${h}px)`:`translateX(${h}px)`,x(e.value.element,"dv-tab--shifting",!0),!0)}_scheduleFlipReset(){requestAnimationFrame(()=>{var e;for(let n of this._tabs)n.value.element.style.transform&&(n.value.element.style.transform="");this._tabGroupManager.trackUnderlines(),(e=this._flipTransitionCleanup)===null||e===void 0||e.call(this);let t=n=>{if(n.propertyName==="transform"){i();for(let o of this._tabs)x(o.value.element,"dv-tab--shifting",!1);this._tabGroupManager.positionUnderlines()}},i=()=>{this._tabsList.removeEventListener("transitionend",t),this._flipTransitionCleanup=null};this._flipTransitionCleanup=i,this._tabsList.addEventListener("transitionend",t)})}},To=class extends k{get _animState(){return this._reorder.animState}set _animState(e){this._reorder.animState=e}get _pendingCollapse(){return this._reorder.pendingCollapse}set _pendingCollapse(e){this._reorder.pendingCollapse=e}get tabItems(){return this._tabs}get tabMap(){return this._tabMap}get tabsList(){return this._tabsList}get groupPanel(){return this.group}get component(){return this.accessor}get tabGroupManager(){return this._tabGroupManager}fireDrop(e){this._onDrop.fire(e)}setOverflowExclude(e){this._overflowExclude=e,this.refreshOverflow()}setForcedOverflow(e){this._forcedOverflow=e,this.refreshOverflow()}refreshOverflow(){this._showTabsOverflowControl&&this.toggleDropdown({reset:!1}),this._applyPinnedSticky()}setPinnedSticky(e){this._pinnedSticky!==e&&(this._pinnedSticky=e,this._applyPinnedSticky())}_applyPinnedSticky(){let e=this._pinnedSticky?this._tabs.filter(i=>this._overflowExclude(i.value.panel.id)):[];if(e.length===0&&!this._hasPinnedStickyStyling)return;for(let i of this._tabs){let n=i.value.element;n.classList.contains("dv-tab--pinned-sticky")&&(n.classList.remove("dv-tab--pinned-sticky"),n.style.removeProperty("--dv-pinned-sticky-left"))}if(e.length===0){this._hasPinnedStickyStyling=!1;return}let t=e.map(i=>i.value.element.offsetLeft);e.forEach((i,n)=>{let o=i.value.element;o.classList.add("dv-tab--pinned-sticky"),o.style.setProperty("--dv-pinned-sticky-left",`${t[n]}px`)}),this._hasPinnedStickyStyling=!0}get showTabsOverflowControl(){return this._showTabsOverflowControl}set showTabsOverflowControl(e){if(this._showTabsOverflowControl!=e)if(this._showTabsOverflowControl=e,e){let t=new Dn(this._tabsList);this._observerDisposable.value=new k(t,t.onDidChange(i=>{let n=i.hasScrollX||i.hasScrollY;this.toggleDropdown({reset:!n}),this._applyPinnedSticky(),this._tabGroupManager.groupUnderlines.size>0&&this._tabGroupManager.positionUnderlines()}),C(this._tabsList,"scroll",()=>{this.toggleDropdown({reset:!1}),this._applyPinnedSticky(),this._tabGroupManager.groupUnderlines.size>0&&this._tabGroupManager.positionUnderlines()}))}else this._observerDisposable.value=M.NONE}get element(){return this._element}get tabsListElement(){return this._tabsList}set voidContainer(e){var t;(t=this._voidContainerListeners)===null||t===void 0||t.dispose(),this._voidContainerListeners=null,this._reorder.voidContainerElement=e,e&&(this._voidContainerListeners=new k(C(e,"dragover",i=>{this._animState&&i.preventDefault()}),C(e,"drop",i=>{var n;!((n=this._animState)===null||n===void 0)&&n.sourceTabGroupId&&this._animState.currentInsertionIndex!==null&&(i.preventDefault(),i.stopPropagation(),this.handleVoidDrop())})))}handleVoidDrop(){var e,t;if(!(!((e=this._animState)===null||e===void 0)&&e.sourceTabGroupId))return!1;let i=this._animState.sourceTabGroupId,n=(t=this._animState.currentInsertionIndex)!==null&&t!==void 0?t:this._tabs.length;return this._animState=null,this._commitGroupMove(i,n),!0}get panels(){return this._tabs.map(e=>e.value.panel.id)}get size(){return this._tabs.length}get tabs(){return this._tabs.map(e=>e.value)}get direction(){return this._direction}set direction(e){if(this._direction!==e){this._direction=e,this._tabsList.setAttribute("aria-orientation",e==="vertical"?"vertical":"horizontal"),this._scrollbar&&(this._scrollbar.orientation=e),oe(this._tabsList,"dv-horizontal","dv-vertical"),e==="vertical"?re(this._tabsList,"dv-tabs-container-vertical","dv-vertical"):(oe(this._tabsList,"dv-tabs-container-vertical"),re(this._tabsList,"dv-horizontal"));for(let t of this._tabs)t.value.setDirection(e);this._tabGroupManager.updateDirection()}}constructor(e,t,i){super(),this.group=e,this.accessor=t,this._observerDisposable=new H,this._pointerActivation=new H,this._scrollbar=null,this._tabs=[],this._tabMap=new Map,this.selectedIndex=-1,this._showTabsOverflowControl=!1,this._overflowExclude=()=>!1,this._forcedOverflow=()=>!1,this._pinnedSticky=!1,this._hasPinnedStickyStyling=!1,this._direction="horizontal",this._voidContainerListeners=null,this._onTabDragStart=new m,this.onTabDragStart=this._onTabDragStart.event,this._onDrop=new m,this.onDrop=this._onDrop.event,this._onWillShowOverlay=new m,this.onWillShowOverlay=this._onWillShowOverlay.event,this._onOverflowTabsChange=new m,this.onOverflowTabsChange=this._onOverflowTabsChange.event,this._tabsList=document.createElement("div"),this._tabsList.className="dv-tabs-container",this._tabsList.setAttribute("role","tablist"),this._tabsList.setAttribute("aria-orientation",this._direction==="vertical"?"vertical":"horizontal"),this.showTabsOverflowControl=i.showTabsOverflowControl,t.options.scrollbars==="native"?this._element=this._tabsList:(this._scrollbar=new mi(this._tabsList),this._scrollbar.orientation=this.direction,this._element=this._scrollbar.element,this.addDisposables(this._scrollbar)),this._tabGroupManager=new zo({group:this.group,accessor:this.accessor,tabsList:this._tabsList,getTabs:()=>this._tabs,getTabMap:()=>this._tabMap,getDirection:()=>this._direction},{onChipContextMenu:(o,r)=>{var a;(a=this.accessor.contextMenuService)===null||a===void 0||a.showForChip(o,this.group,r)},onChipDragStart:(o,r,a)=>{this._handleChipDragStart(o,r,a)},onChipDragEnd:()=>{this._reorder.resetDragAnimation()},onChipDrop:(o,r)=>{this._handleChipDrop(o,r)}}),this._reorder=new Po(this);let n=le.createDropTarget(this._tabsList,{acceptedTargetZones:["center"],canDisplayOverlay:()=>!1,isHitTestTransparent:()=>{let o=$();return o?.viewId!==this.accessor.id||o.groupId!==this.group.id?!0:o.panelId===null&&!o.tabGroupId}});this.addDisposables(n,this._onOverflowTabsChange,this._observerDisposable,this._pointerActivation,this._onWillShowOverlay,this._onDrop,this._onTabDragStart,this._reorder,$e.getInstance().onDragEnd(o=>{this._reorder.handlePointerDragEnd(o)}),$e.getInstance().onDragMove(o=>{this._reorder.handlePointerDragMove(o.clientX,o.clientY)}),C(this.element,"pointerdown",o=>{o.defaultPrevented||o.button===0&&this.accessor.doSetGroupActive(this.group)}),C(this._tabsList,"wheel",o=>{let r=this._direction==="vertical",a=r?o.deltaY||o.deltaX:o.deltaX||o.deltaY;if(a===0)return;let s=r?this._tabsList.scrollHeight-this._tabsList.clientHeight:this._tabsList.scrollWidth-this._tabsList.clientWidth;if(s<=0)return;let d=r?this._tabsList.scrollTop:this._tabsList.scrollLeft;a<0&&d<=0||a>0&&d>=s||(o.preventDefault(),o.stopPropagation(),r?this._tabsList.scrollTop=d+a:this._tabsList.scrollLeft=d+a)},{passive:!1}),C(this._tabsList,"keydown",o=>{this._onKeyDown(o)}),C(this._tabsList,"dragover",o=>{this._reorder.processDragOver(o.clientX,o.clientY)&&o.preventDefault()},!0),C(this._tabsList,"dragleave",o=>{this._reorder.processDragLeave(o.relatedTarget)},!0),C(this._tabsList,"dragend",()=>{this._reorder.resetDragAnimation()}),C(this._tabsList,"drop",o=>{var r,a,s;if(((r=this._animState)===null||r===void 0?void 0:r.currentInsertionIndex)==null||((a=this.accessor.options.theme)===null||a===void 0?void 0:a.tabAnimation)!=="smooth"&&!this._animState.sourceTabGroupId)return;o.stopPropagation(),o.preventDefault(),(s=this.group.model.dropTargetContainer)===null||s===void 0||(s=s.model)===null||s===void 0||s.clear();let d=this._animState;if(this._animState=null,this._pendingCollapse=!1,d.sourceTabGroupId){this._commitGroupMove(d.sourceTabGroupId,d.currentInsertionIndex);return}let l=d.currentInsertionIndex,h=d.sourceIndex,c=l-(h!==-1&&h<l?1:0),v=this.group.model.getTabGroupForPanel(d.sourceTabId);if(c===h&&!d.targetTabGroupId&&!v){this._reorder.uncollapseSourceTab(d.sourceTabId),this.resetTabTransforms();return}this._reorder.uncollapseSourceTab(d.sourceTabId);let p=this.snapshotTabPositions();this.resetTabTransforms(),this._onDrop.fire({event:o,index:c,targetTabGroupId:d.targetTabGroupId}),this.runFlipAnimation(p,d.sourceTabId,d.sourceIndex===-1,{from:Math.min(h,c),to:Math.max(h,c)})},!0),M.from(()=>{var o;(o=this._voidContainerListeners)===null||o===void 0||o.dispose(),this._reorder.resetDragAnimation(),this._tabGroupManager.disposeAll();for(let{value:r,disposable:a}of this._tabs)a.dispose(),r.dispose();this._tabs=[],this._tabMap.clear()}))}indexOf(e){return this._tabs.findIndex(t=>t.value.panel.id===e)}getTabId(e){var t;return(t=this._tabMap.get(e))===null||t===void 0?void 0:t.value.element.id}getPanelForTab(e){for(let{value:t}of this._tabs)if(t.element===e||t.element.contains(e))return t.panel}isActive(e){return this.selectedIndex>-1&&this._tabs[this.selectedIndex].value===e}_onKeyDown(e){let t=this._tabs.findIndex(a=>a.value.element===e.target);if(t===-1)return;let i=this._direction==="vertical",n=i?"ArrowDown":"ArrowRight",o=i?"ArrowUp":"ArrowLeft",r=this._tabs.length-1;switch(e.key){case n:e.preventDefault(),this._focusTab(Math.min(t+1,r));break;case o:e.preventDefault(),this._focusTab(Math.max(t-1,0));break;case"Home":e.preventDefault(),this._focusTab(0);break;case"End":e.preventDefault(),this._focusTab(r);break;case"Enter":case" ":e.preventDefault(),this.accessor.withOrigin("user",()=>this._tabs[t].value.panel.api.setActive());break;case"Delete":case"Backspace":e.preventDefault(),this._closeTab(t);break}}_closeTab(e){var t,i,n,o,r;let a=(t=this._tabs[e])===null||t===void 0?void 0:t.value;if(!a)return;let s=(i=(n=(o=this._tabs[e+1])===null||o===void 0?void 0:o.value)!==null&&n!==void 0?n:(r=this._tabs[e-1])===null||r===void 0?void 0:r.value)===null||i===void 0?void 0:i.panel.id;if(a.panel.api.close(),s!==void 0){let d=this._tabs.findIndex(l=>l.value.panel.id===s);d>-1&&this._focusTab(d)}}_focusTab(e){for(let t=0;t<this._tabs.length;t++)this._tabs[t].value.element.tabIndex=t===e?0:-1;this._tabs[e].value.element.focus()}focusActiveTab(){var e;if(this._tabs.length===0)return;let t=(e=this.group.activePanel)===null||e===void 0?void 0:e.id,i=t?this._tabs.findIndex(n=>n.value.panel.id===t):-1;this._focusTab(i>-1?i:0)}setActivePanel(e){let t=this._direction==="vertical";for(let i of this._tabs){let n=e.id===i.value.panel.id;i.value.setActive(n),n&&this._scrollTabIntoView(i.value.element,t)}this._tabGroupManager.groupUnderlines.size>0&&this._tabGroupManager.positionUnderlines()}_scrollTabIntoView(e,t){let i=e.parentElement;if(!i)return;let n=t?e.offsetTop:e.offsetLeft,o=t?e.offsetHeight:e.offsetWidth,r=t?i.scrollTop:i.scrollLeft,a=t?i.clientHeight:i.clientWidth;(n<r||n+o>r+a)&&(t?i.scrollTop=n:i.scrollLeft=n)}_activateOnPointerDown(e){if(!he(this.accessor.options).html5){this.group.model.openPanel(e);return}let t=requestAnimationFrame(()=>{this._tabMap.has(e.id)&&this.group.model.openPanel(e)});this._pointerActivation.value={dispose:()=>cancelAnimationFrame(t)}}openPanel(e,t=this._tabs.length){if(this._tabMap.has(e.id))return;let i=new ui(e,this.accessor,this.group);i.setContent(e.view.tab),this._direction!=="horizontal"&&i.setDirection(this._direction);let n={value:i,disposable:new k(i.onDragStart(o=>{var r;if(this._onTabDragStart.fire({nativeEvent:o,panel:e}),((r=this.accessor.options.theme)===null||r===void 0?void 0:r.tabAnimation)==="smooth"){let a=i.element.getBoundingClientRect().width,s=this._tabs.findIndex(d=>d.value===i);this._animState={sourceTabId:e.id,sourceIndex:s,tabPositions:this.snapshotTabPositions(),chipPositions:this._tabGroupManager.snapshotChipWidths(),currentInsertionIndex:null,targetTabGroupId:null,sourceTabGroupId:null,sourceGroupPanelIds:null,sourceChipWidth:0,cursorOffsetFromDragLeft:a/2,sourceGapWidth:a,containerLeft:this._tabsList.getBoundingClientRect().left},this._pendingCollapse=!0,requestAnimationFrame(()=>{var d,l;this._pendingCollapse=!1,this._animState&&(this._tabsList.classList.contains("dv-tabs-container--wrap")||(i.element.style.transition="none",x(i.element,"dv-tab--dragging",!0),i.element.offsetHeight),(l=(d=this._animState).currentInsertionIndex)!==null&&l!==void 0||(d.currentInsertionIndex=s),this.applyDragOverTransforms(!0),i.element.style.removeProperty("transition"))})}}),i.onTabClick(o=>{o.defaultPrevented||this.group.api.location.type==="edge"&&(this.group.activePanel===e?this.group.api.isCollapsed()?this.group.api.expand():this.group.api.collapse():(this.group.model.openPanel(e),this.group.api.isCollapsed()&&this.group.api.expand()))}),i.onPointerDown(o=>{if(o.defaultPrevented)return;let r=!this.accessor.options.disableFloatingGroups,a=this.group.api.location.type==="floating"&&this.size===1;if(r&&!a&&o.shiftKey){o.preventDefault();let s=this.accessor.getGroupPanel(i.panel.id),{top:d,left:l}=i.element.getBoundingClientRect(),{top:h,left:c}=this.accessor.element.getBoundingClientRect();this.accessor.addFloatingGroup(s,{x:l-c,y:d-h,inDragMode:!0});return}o.button===0&&this.group.api.location.type!=="edge"&&this.group.activePanel!==e&&this._activateOnPointerDown(e)}),i.onDrop(o=>{let r=this._animState;this._animState=null,this._pendingCollapse=!1;let a=this._tabs.findIndex(c=>c.value===i);if(r){var s;let c=o.position==="right"?a+1:a;if(r.sourceTabGroupId){var d;this._commitGroupMove(r.sourceTabGroupId,(d=r.currentInsertionIndex)!==null&&d!==void 0?d:c);return}this._reorder.uncollapseSourceTab(r.sourceTabId);let v=this.snapshotTabPositions();this.resetTabTransforms(),this._onDrop.fire({event:o.nativeEvent,index:c,targetTabGroupId:r.targetTabGroupId}),((s=this.accessor.options.theme)===null||s===void 0?void 0:s.tabAnimation)==="smooth"&&this.runFlipAnimation(v,r.sourceTabId,r.sourceIndex===-1,r.sourceIndex===-1?void 0:{from:Math.min(r.sourceIndex,c),to:Math.max(r.sourceIndex,c)})}else{var l,h;let c=this._direction==="vertical"?"bottom":"right",v=o.position===c?a+1:a,p=$(),u=p?this._tabs.findIndex(D=>D.value.panel.id===p.panelId):-1,g=v-(u!==-1&&u<v?1:0),b=(l=(h=this.group.model.getTabGroupForPanel(i.panel.id))===null||h===void 0?void 0:h.id)!==null&&l!==void 0?l:null;this._onDrop.fire({event:o.nativeEvent,index:g,targetTabGroupId:b})}}),i.onWillShowOverlay(o=>{this._onWillShowOverlay.fire(new ke(o,{kind:"tab",panel:this.group.activePanel,api:this.accessor.api,group:this.group,getData:$}))}))};this.addTab(n,t),this._tabGroupManager.positionAllChips(),this._animState&&(this._animState.tabPositions=this.snapshotTabPositions(),this._animState.chipPositions=this._tabGroupManager.snapshotChipWidths(),this.applyDragOverTransforms())}delete(e){var t;((t=this._animState)===null||t===void 0?void 0:t.sourceTabId)===e&&(this.resetTabTransforms(),this._animState=null),this._tabGroupManager.cleanupTransition(e);let i=this.indexOf(e),n=this._tabs.splice(i,1)[0];if(this._tabMap.delete(e),n){let{value:o,disposable:r}=n;r.dispose(),o.dispose(),o.element.remove()}this._animState&&(this._animState.tabPositions=this.snapshotTabPositions(),this._animState.chipPositions=this._tabGroupManager.snapshotChipWidths(),this.applyDragOverTransforms())}addTab(e,t=this._tabs.length){if(t<0||t>this._tabs.length)throw new Error("invalid location");let i=t<this._tabs.length?this._tabs[t].value.element:null;this._tabsList.insertBefore(e.value.element,i),this._tabs=[...this._tabs.slice(0,t),e,...this._tabs.slice(t)],this._tabMap.set(e.value.panel.id,e),this.selectedIndex<0&&(this.selectedIndex=t)}toggleDropdown(e){let t=this._tabs.some(a=>!this._overflowExclude(a.value.panel.id)&&this._forcedOverflow(a.value.panel.id));if(e.reset&&!t){this._onOverflowTabsChange.fire({tabs:[],tabGroups:[],pinnedTabs:[],reset:!0});return}let i=this._tabs.filter(a=>!this._overflowExclude(a.value.panel.id)&&(this._forcedOverflow(a.value.panel.id)||!e.reset&&!tt(a.value.element,this._tabsList))).map(a=>a.value.panel.id),n=e.reset?[]:this._tabs.filter(a=>this._overflowExclude(a.value.panel.id)&&a.value.element.getBoundingClientRect().width>0&&!tt(a.value.element,this._tabsList)).map(a=>a.value.panel.id),o=new Set(i),r=[];for(let a of this.group.model.getTabGroups()){let s=this._tabGroupManager.chipRenderers.get(a.id),d=s&&!tt(s.chip.element,this._tabsList),l=a.panelIds.length>0&&a.panelIds.every(h=>o.has(h));if((d||l)&&(r.push(a.id),a.collapsed))for(let h of a.panelIds)o.has(h)||(o.add(h),i.push(h))}this._onOverflowTabsChange.fire({tabs:i,tabGroups:r,pinnedTabs:n,reset:!1})}updateDragAndDropState(){for(let e of this._tabs)e.value.updateDragAndDropState();this._tabGroupManager.updateDragAndDropState()}updateTabGroups(){this._tabGroupManager.update()}refreshTabGroupAccent(){this._tabGroupManager.refreshAccents()}_handleChipDragStart(e,t,i){var n;let o=e.panelIds[0],r=o?this._tabs.findIndex(l=>l.value.panel.id===o):-1,a=t.element.getBoundingClientRect(),s=a.width;for(let l of e.panelIds){let h=this._tabMap.get(l);h&&(s+=h.value.element.getBoundingClientRect().width)}if(this._animState={sourceTabId:"",sourceIndex:r,tabPositions:this.snapshotTabPositions(),chipPositions:this._tabGroupManager.snapshotChipWidths(),currentInsertionIndex:null,targetTabGroupId:null,sourceTabGroupId:e.id,sourceGroupPanelIds:new Set(e.panelIds),sourceChipWidth:a.width,cursorOffsetFromDragLeft:i.clientX-a.left,sourceGapWidth:s,containerLeft:this._tabsList.getBoundingClientRect().left},((n=this.accessor.options.theme)===null||n===void 0?void 0:n.tabAnimation)!=="smooth")return;let d=new Set(e.panelIds);this._pendingCollapse=!0,requestAnimationFrame(()=>{var l,h;if(this._pendingCollapse=!1,!this._animState)return;for(let p of this._tabs)d.has(p.value.panel.id)&&(p.value.element.style.transition="none",x(p.value.element,"dv-tab--dragging",!0));let c=this._tabGroupManager.chipRenderers.get(e.id);c&&(c.chip.element.style.transition="none",x(c.chip.element,"dv-tab-group-chip--dragging",!0)),this._tabsList.offsetHeight;let v=this._tabGroupManager.groupUnderlines.get(e.id);v&&(v.style.display="none"),(h=(l=this._animState).currentInsertionIndex)!==null&&h!==void 0||(l.currentInsertionIndex=r),this.applyDragOverTransforms(!0);for(let p of this._tabs)d.has(p.value.panel.id)&&p.value.element.style.removeProperty("transition");c&&c.chip.element.style.removeProperty("transition")})}_handleChipDrop(e,t){let i=e.panelIds[0];if(!i)return;let n=this._tabs.findIndex(d=>d.value.panel.id===i);if(n===-1)return;let o=$();if(o?.tabGroupId){var r;let d=this._animState;this._animState=null,this._pendingCollapse=!1,this._commitGroupMove(o.tabGroupId,(r=d?.currentInsertionIndex)!==null&&r!==void 0?r:n);return}let a=o?.groupId===this.group.id&&o?.panelId?this._tabs.findIndex(d=>d.value.panel.id===o.panelId):-1,s=n-(a!==-1&&a<n?1:0);this._onDrop.fire({event:t.nativeEvent,index:s,targetTabGroupId:null})}setExtendedDropZone(e){this._reorder.setExtendedDropZone(e)}setExternalInsertionIndex(e){this._reorder.setExternalInsertionIndex(e)}clearExternalAnimState(){this._reorder.clearExternalAnimState()}snapshotTabPositions(){return this._reorder.snapshotTabPositions()}handleDragOver(e){this._reorder.handleDragOver(e)}applyDragOverTransforms(e=!1){this._reorder.applyDragOverTransforms(e)}resetTabTransforms(){this._reorder.resetTabTransforms()}_commitGroupMove(e,t){this._reorder.commitGroupMove(e,t)}runFlipAnimation(e,t,i=!1,n){this._reorder.runFlipAnimation(e,t,i,n)}};function Io(){let e=document.createElement("div");e.className="dv-tabs-overflow-dropdown-default";let t=document.createElement("span");t.textContent="";let i=pi();return e.appendChild(i),e.appendChild(t),{element:e,update:n=>{t.textContent=`${n.tabs}`}}}var Ao=class extends k{get onTabDragStart(){return this.tabs.onTabDragStart}get panels(){return this.tabs.panels}get size(){return this.tabs.size}get hidden(){return this._hidden}set hidden(e){this._hidden=e,this.element.style.display=e?"none":""}get direction(){return this._direction}set direction(e){this._direction=e,e==="vertical"?(re(this._element,"dv-groupview-header-vertical"),re(this.rightActionsContainer,"dv-right-actions-container-vertical"),this.tabs.direction=e):(oe(this._element,"dv-groupview-header-vertical"),oe(this.rightActionsContainer,"dv-right-actions-container-vertical"),this.tabs.direction=e)}get element(){return this._element}get tabsListElement(){return this.tabs.tabsListElement}constructor(e,t){super(),this.accessor=e,this.group=t,this._hidden=!1,this._direction="horizontal",this._dropIndexResolver=(i,n)=>n,this._pinnedRow=void 0,this.dropdownPart=null,this._overflowTabs=[],this._overflowTabGroups=[],this._overflowPinnedTabs=[],this._dropdownDisposable=new H,this._onDrop=new m,this.onDrop=this._onDrop.event,this._onGroupDragStart=new m,this.onGroupDragStart=this._onGroupDragStart.event,this._onWillShowOverlay=new m,this.onWillShowOverlay=this._onWillShowOverlay.event,this._element=document.createElement("div"),this._element.className="dv-tabs-and-actions-container",x(this._element,"dv-full-width-single-tab",this.accessor.options.singleTabMode==="fullwidth"),this.rightActionsContainer=document.createElement("div"),this.rightActionsContainer.className="dv-right-actions-container",this.leftActionsContainer=document.createElement("div"),this.leftActionsContainer.className="dv-left-actions-container",this.preActionsContainer=document.createElement("div"),this.preActionsContainer.className="dv-pre-actions-container",this.tabs=new To(t,e,{showTabsOverflowControl:!e.options.disableTabsOverflowList}),this.voidContainer=new _o(this.accessor,this.group),this.tabs.voidContainer=this.voidContainer.element,this._element.appendChild(this.preActionsContainer),this._element.appendChild(this.tabs.element),this._element.appendChild(this.leftActionsContainer),this._element.appendChild(this.voidContainer.element),this._element.appendChild(this.rightActionsContainer),this.tabs.setExtendedDropZone(this._element),this.addDisposables(this.tabs.onDrop(i=>this._onDrop.fire(i)),this.tabs.onWillShowOverlay(i=>this._onWillShowOverlay.fire(i)),e.onDidOptionsChange(()=>{this.tabs.showTabsOverflowControl=!e.options.disableTabsOverflowList}),this.tabs.onOverflowTabsChange(i=>{this.toggleDropdown(i)}),this.tabs,this._onWillShowOverlay,this._onDrop,this._onGroupDragStart,this.voidContainer,this.voidContainer.onDragStart(i=>{this._onGroupDragStart.fire({nativeEvent:i,group:this.group})}),this.voidContainer.onDrop(i=>{this.tabs.handleVoidDrop()||this._onDrop.fire({event:i.nativeEvent,index:this.tabs.size})}),this.voidContainer.onWillShowOverlay(i=>{this._onWillShowOverlay.fire(new ke(i,{kind:"header_space",panel:this.group.activePanel,api:this.accessor.api,group:this.group,getData:$}))}),C(this.leftActionsContainer,"dragleave",i=>{let n=i.relatedTarget;!this.leftActionsContainer.contains(n)&&!this._element.contains(n)&&this.tabs.clearExternalAnimState()}),C(this.voidContainer.element,"dragleave",i=>{let n=i.relatedTarget;this.voidContainer.element.contains(n)||(this._element.contains(n)?this.tabs.setExternalInsertionIndex(null):this.tabs.clearExternalAnimState())}),C(this.voidContainer.element,"pointerdown",i=>{if(!i.defaultPrevented&&!this.accessor.options.disableFloatingGroups&&i.shiftKey&&this.group.api.location.type!=="floating"&&this.group.api.location.type!=="edge"){i.preventDefault();let{top:n,left:o}=this.element.getBoundingClientRect(),{top:r,left:a}=this.accessor.element.getBoundingClientRect();this.accessor.addFloatingGroup(this.group,{x:o-a+20,y:n-r+20,inDragMode:!0})}}))}show(){this.hidden||(this.element.style.display="")}hide(){this._element.style.display="none"}setRightActionsElement(e){this.rightActions!==e&&(this.rightActions&&(this.rightActions.remove(),this.rightActions=void 0),e&&(this.rightActionsContainer.appendChild(e),this.rightActions=e))}setLeftActionsElement(e){this.leftActions!==e&&(this.leftActions&&(this.leftActions.remove(),this.leftActions=void 0),e&&(this.leftActionsContainer.appendChild(e),this.leftActions=e))}setPrefixActionsElement(e){this.preActions!==e&&(this.preActions&&(this.preActions.remove(),this.preActions=void 0),e&&(this.preActionsContainer.appendChild(e),this.preActions=e))}isActive(e){return this.tabs.isActive(e)}indexOf(e){return this.tabs.indexOf(e)}getTabId(e){return this.tabs.getTabId(e)}getPanelForTab(e){return this.tabs.getPanelForTab(e)}setActive(e){}delete(e){this.tabs.delete(e),this.updateClassnames()}setActivePanel(e){this.tabs.setActivePanel(e)}focusActiveTab(){this.tabs.focusActiveTab()}openPanel(e,t=this.tabs.size){this.tabs.openPanel(e,t),this.updateClassnames()}closePanel(e){this.delete(e.id)}setOverflowExclude(e){this.tabs.setOverflowExclude(e)}setForcedOverflow(e){this.tabs.setForcedOverflow(e)}setPinnedSticky(e){this.tabs.setPinnedSticky(e)}refreshOverflow(){this.tabs.refreshOverflow()}setPinnedRow(e){this._pinnedRow!==e&&(this._pinnedRow&&this._pinnedRow.remove(),this._pinnedRow=e,e&&(e.classList.add("dv-pinned-row"),this._element.insertBefore(e,this._element.firstChild)),x(this._element,"dv-tabs-and-actions-container--pinned-row",!!e))}setDropIndexResolver(e){this._dropIndexResolver=e}resolveDropIndex(e,t){return this._dropIndexResolver(e,t)}updateClassnames(){x(this._element,"dv-single-tab",this.size===1)}toggleDropdown(e){let t=e.reset?[]:e.tabs,i=e.reset?[]:e.tabGroups,n=e.reset?[]:e.pinnedTabs;this._overflowTabs=t,this._overflowTabGroups=i,this._overflowPinnedTabs=n;let o=this._overflowTabs.length+this._overflowPinnedTabs.length;if(o>0&&this.dropdownPart){this.dropdownPart.update({tabs:o});return}if(o===0){this._dropdownDisposable.dispose();return}let r=document.createElement("div");r.className="dv-tabs-overflow-dropdown-root";let a=Io();a.update({tabs:o}),this.dropdownPart=a,r.appendChild(a.element),this.rightActionsContainer.prepend(r),this._dropdownDisposable.value=new k(M.from(()=>{var s,d;r.remove(),(s=this.dropdownPart)===null||s===void 0||(d=s.dispose)===null||d===void 0||d.call(s),this.dropdownPart=null}),C(r,"pointerdown",s=>{s.preventDefault()},{capture:!0}),C(r,"click",s=>{let d=it(r),l={x:s.clientX,y:s.clientY,zIndex:d?.style.zIndex?`calc(${d.style.zIndex} * 2)`:void 0},h=this.createOverflowRenderContext(r,l),c=this.accessor.advancedOverflowService;c?c.renderOverflow({group:this.group,overflowTabs:[...this._overflowTabs],overflowTabGroups:[...this._overflowTabGroups],pinnedOverflowTabs:[...this._overflowPinnedTabs],context:h}):h.open(this.renderFreeOverflowList(h))}))}createOverflowRenderContext(e,t){let i=new Set(this._overflowTabGroups),n=this.group.model.getTabGroups(),o=new Map,r=new Map;for(let d of n)if(r.set(d.id,d),i.has(d.id))for(let l of d.panelIds)o.set(l,d);let a=()=>this.accessor.getPopupServiceForGroup(this.group),s=d=>{let l=document.createElement("div");l.className="dv-tabs-overflow-group-header";let h=document.createElement("span");h.className="dv-tabs-overflow-group-color",Fe(h,d.color,this.accessor.tabGroupColorPalette),l.appendChild(h);let c=document.createElement("span");if(c.className="dv-tabs-overflow-group-label",c.textContent=d.label||d.id,l.appendChild(c),d.collapsed){let v=document.createElement("span");v.className="dv-tabs-overflow-group-collapsed-badge",v.textContent=`${d.panelIds.length}`,l.appendChild(v)}return l.addEventListener("click",()=>{a().close(),d.collapsed&&d.expand();let v=d.panelIds[0];if(v){let p=this.group.panels.find(u=>u.id===v);this.accessor.withOrigin("user",()=>p?.api.setActive())}}),l};return{overflowGroupIdForPanel:d=>{var l;return(l=o.get(d))===null||l===void 0?void 0:l.id},buildGroupHeader:d=>{let l=r.get(d);if(!(!l||!i.has(l.id)))return s(l)},buildPinnedHeader:()=>{let d=document.createElement("div");d.className="dv-tabs-overflow-group-header dv-tabs-overflow-pinned-header";let l=_t();l.classList.add("dv-tabs-overflow-pinned-icon"),d.appendChild(l);let h=document.createElement("span");return h.className="dv-tabs-overflow-group-label",h.textContent="Pinned",d.appendChild(h),d},buildRow:d=>{let l=this.group.panels.find(g=>g.id===d);if(!l)return;let h=this.tabs.tabs.find(g=>g.panel.id===d),c=o.get(d),v=l.view.createTabRenderer("headerOverflow").element,p=document.createElement("div");x(p,"dv-tab",!0),x(p,"dv-active-tab",l.api.isActive),x(p,"dv-inactive-tab",!l.api.isActive),c&&x(p,"dv-tab--grouped",!0);let u=()=>{c?.collapsed&&c.expand(),h?.element.scrollIntoView({block:"nearest",inline:"nearest"}),this.accessor.withOrigin("user",()=>l.api.setActive())};return p.addEventListener("click",g=>{a().close(),!g.defaultPrevented&&u()}),p.appendChild(v),{element:p,panel:l,activate:()=>{a().close(),u()}}},open:d=>{a().openPopover(d,t)},close:()=>a().close(),focusTrigger:()=>{e.tabIndex=-1,e.focus()}}}renderFreeOverflowList(e){let t=document.createElement("div");t.style.overflow="auto",t.className="dv-tabs-overflow-container";let i=this._overflowPinnedTabs.map(o=>e.buildRow(o)).filter(o=>o!=null);if(i.length>0){t.appendChild(e.buildPinnedHeader());for(let o of i)t.appendChild(o.element)}let n=new Set;for(let o of this.tabs.tabs.filter(r=>this._overflowTabs.includes(r.panel.id))){let r=e.overflowGroupIdForPanel(o.panel.id);if(r&&!n.has(r)){n.add(r);let s=e.buildGroupHeader(r);s&&t.appendChild(s)}let a=e.buildRow(o.panel.id);a&&t.appendChild(a.element)}return t}updateDragAndDropState(){this.tabs.updateDragAndDropState(),this.voidContainer.updateDragAndDropState()}updateTabGroups(){this.tabs.updateTabGroups()}refreshTabGroupAccent(){this.tabs.refreshTabGroupAccent()}},Eo=class extends k{get label(){return this._label}get color(){return this._color}get componentParams(){return this._componentParams}setLabel(e){this.isDisposed||this._label===e||(this._label=e,this._onDidChange.fire())}setColor(e){if(this.isDisposed)return;let t=e===""?void 0:e;this._color!==t&&(this._color=t,this._onDidChange.fire())}setComponentParams(e){this.isDisposed||(this._componentParams=e,this._onDidChange.fire())}get collapsed(){return this._collapsed}get panelIds(){return this._panelIds}get size(){return this._panelIds.length}get isEmpty(){return this._panelIds.length===0}constructor(e,t){var i,n;super(),this.id=e,this._collapsed=!1,this._panelIds=[],this._onDidChange=new m,this.onDidChange=this._onDidChange.event,this._onDidPanelChange=new m,this.onDidPanelChange=this._onDidPanelChange.event,this._onDidCollapseChange=new m,this.onDidCollapseChange=this._onDidCollapseChange.event,this._onDidDestroy=new m,this.onDidDestroy=this._onDidDestroy.event,this._label=(i=t?.label)!==null&&i!==void 0?i:"",this._color=t?.color===""?void 0:t?.color,this._collapsed=(n=t?.collapsed)!==null&&n!==void 0?n:!1,this._componentParams=t?.componentParams,this.addDisposables(this._onDidChange,this._onDidPanelChange,this._onDidCollapseChange,this._onDidDestroy)}addPanel(e,t){if(this.isDisposed||this._panelIds.includes(e))return;let i=t===void 0?this._panelIds.length:Math.max(0,Math.min(t,this._panelIds.length));this._panelIds.splice(i,0,e),this._onDidPanelChange.fire({panelId:e,type:"add"})}removePanel(e){if(this.isDisposed)return!1;let t=this._panelIds.indexOf(e);return t===-1?!1:(this._panelIds.splice(t,1),this._onDidPanelChange.fire({panelId:e,type:"remove"}),!0)}indexOfPanel(e){return this._panelIds.indexOf(e)}containsPanel(e){return this._panelIds.includes(e)}collapse(){this.isDisposed||this._collapsed||(this._collapsed=!0,this._onDidCollapseChange.fire(!0))}expand(){this.isDisposed||!this._collapsed||(this._collapsed=!1,this._onDidCollapseChange.fire(!1))}toggle(){this._collapsed?this.expand():this.collapse()}toJSON(){let e={id:this.id,collapsed:this._collapsed,panelIds:[...this._panelIds]};return this._label&&(e.label=this._label),this._color!==void 0&&(e.color=this._color),this._componentParams!==void 0&&(e.componentParams=this._componentParams),e}dispose(){this._onDidDestroy.fire(),super.dispose()}},Ue=class extends qe{get nativeEvent(){return this.options.nativeEvent}get position(){return this.options.position}get panel(){return this.options.panel}get group(){return this.options.group}get api(){return this.options.api}constructor(e){super(),this.options=e}getData(){return this.options.getData()}},St=class extends Ue{get kind(){return this._kind}constructor(e){super(e),this._kind=e.kind}},ki=class extends k{get tabGroups(){return this._tabGroups}get element(){throw new Error("dockview: not supported")}get activePanel(){return this._activePanel}get contentContainerId(){return this.contentContainer.element.id}get contentDropTarget(){return this.contentContainer.dropTarget}get locked(){return this._locked}set locked(e){this._locked=e,x(this.container,"dv-locked-groupview",e==="no-drop-target"||e)}get isActive(){return this._isGroupActive}get panels(){return this._panels}get size(){return this._panels.length}get isEmpty(){return this._panels.length===0}get hasWatermark(){return!!(this.watermark&&this.container.contains(this.watermark.element))}get header(){return this.tabsContainer}get tabsListElement(){return this.tabsContainer.tabsListElement}getPanelForTab(e){return this.tabsContainer.getPanelForTab(e)}get isContentFocused(){return document.activeElement?Qe(document.activeElement,this.contentContainer.element):!1}get headerPosition(){var e;return(e=this._headerPosition)!==null&&e!==void 0?e:"top"}set headerPosition(e){var t;this._headerPosition=e,this.invalidateHeaderSize(),oe(this.container,"dv-groupview-header-top","dv-groupview-header-bottom","dv-groupview-header-left","dv-groupview-header-right"),re(this.container,`dv-groupview-header-${e}`);let i=e==="top"||e==="bottom"?"horizontal":"vertical",n=this._headerDirection;if(this._headerDirection=i,this.tabsContainer.direction=i,this.header.direction=i,!((t=this._activePanel)===null||t===void 0)&&t.layout){let{width:r,height:a}=this.contentDimensions();this._activePanel.layout(r,a)}if(this.updateHeaderActions(),n!==void 0&&n!==i){var o;(o=this.groupPanel)===null||o===void 0||o.api._onDidHeaderDirectionChange.fire({direction:i,position:e})}}get location(){return this._location}set location(e){this._location=e,x(this.container,"dv-groupview-floating",!1),x(this.container,"dv-groupview-popout",!1),x(this.container,"dv-groupview-edge",!1);let t=i=>{this.contentContainer.dropTarget.setTargetZones(i),this.contentContainer.pointerDropTarget.setTargetZones(i)};switch(e.type){case"grid":t(["top","bottom","left","right","center"]);break;case"floating":t(["top","bottom","left","right","center"]),x(this.container,"dv-groupview-floating",!0);break;case"popout":t(["top","bottom","left","right","center"]),x(this.container,"dv-groupview-popout",!0);break;case"edge":t(["center"]),x(this.container,"dv-groupview-edge",!0);break}this.groupPanel.api._onDidLocationChange.fire({location:this.location})}constructor(e,t,i,n,o){var r,a;super(),this.container=e,this.accessor=t,this.id=i,this.options=n,this.groupPanel=o,this._isGroupActive=!1,this._locked=!1,this._location={type:"grid"},this.mostRecentlyUsed=[],this._overwriteRenderContainer=null,this._overwriteDropTargetContainer=null,this._onDidChange=new m,this.onDidChange=this._onDidChange.event,this._width=0,this._height=0,this._panels=[],this._panelDisposables=new Map,this._tabGroupDisposables=new Map,this._pendingMicrotaskDisposables=new Set,this._onMove=new m,this.onMove=this._onMove.event,this._onDidDrop=new m,this.onDidDrop=this._onDidDrop.event,this._onWillDrop=new m,this.onWillDrop=this._onWillDrop.event,this._onWillShowOverlay=new m,this.onWillShowOverlay=this._onWillShowOverlay.event,this._onTabDragStart=new m,this.onTabDragStart=this._onTabDragStart.event,this._onGroupDragStart=new m,this.onGroupDragStart=this._onGroupDragStart.event,this._onDidAddPanel=new m,this.onDidAddPanel=this._onDidAddPanel.event,this._onDidPanelTitleChange=new m,this.onDidPanelTitleChange=this._onDidPanelTitleChange.event,this._onDidPanelParametersChange=new m,this.onDidPanelParametersChange=this._onDidPanelParametersChange.event,this._onDidRemovePanel=new m,this.onDidRemovePanel=this._onDidRemovePanel.event,this._onDidActivePanelChange=new m,this.onDidActivePanelChange=this._onDidActivePanelChange.event,this._onUnhandledDragOver=new m,this.onUnhandledDragOver=this._onUnhandledDragOver.event,this._tabGroups=[],this._tabGroupMap=new Map,this._panelToTabGroup=new Map,this._tabGroupIdCounter=0,this._pendingTabGroupUpdate=!1,this._onDidCreateTabGroup=new m,this.onDidCreateTabGroup=this._onDidCreateTabGroup.event,this._onDidDestroyTabGroup=new m,this.onDidDestroyTabGroup=this._onDidDestroyTabGroup.event,this._onDidAddPanelToTabGroup=new m,this.onDidAddPanelToTabGroup=this._onDidAddPanelToTabGroup.event,this._onDidRemovePanelFromTabGroup=new m,this.onDidRemovePanelFromTabGroup=this._onDidRemovePanelFromTabGroup.event,this._onDidTabGroupChange=new m,this.onDidTabGroupChange=this._onDidTabGroupChange.event,this._onDidTabGroupCollapsedChange=new m,this.onDidTabGroupCollapsedChange=this._onDidTabGroupCollapsedChange.event,x(this.container,"dv-groupview",!0),this.container.setAttribute("role","region"),this._api=new Ve(this.accessor),this.tabsContainer=new Ao(this.accessor,this.groupPanel),this.contentContainer=new ci(this.accessor,this),e.append(this.tabsContainer.element,this.contentContainer.element),this.header.hidden=!!n.hideHeader,this.locked=(r=n.locked)!==null&&r!==void 0?r:!1,this.headerPosition=(a=n.headerPosition)!==null&&a!==void 0?a:t.defaultHeaderPosition,this.addDisposables(_e(this.tabsContainer.element,()=>{if(this.isDisposed)return;let s=this.measureHeaderSize();s!==this._cachedHeaderSize&&(this._cachedHeaderSize=s,this.layout(this._width,this._height))}),this._onDidPanelTitleChange.event(()=>this.updateAccessibleLabel()),this._onTabDragStart,this._onGroupDragStart,this._onWillShowOverlay,this.tabsContainer.onTabDragStart(s=>{this._onTabDragStart.fire(s)}),this.tabsContainer.onGroupDragStart(s=>{this._onGroupDragStart.fire(s)}),this.tabsContainer.onDrop(s=>{var d;let l=$(),h=(d=l?.panelId)!==null&&d!==void 0?d:null,c=h?this.tabsContainer.resolveDropIndex(h,s.index):s.index;if(this.handleDropEvent("header",s.event,"center",c),h&&s.targetTabGroupId){let v=this._tabGroupMap.get(s.targetTabGroupId),p;if(v){let u=this._panels.findIndex(g=>g.id===h);if(u!==-1){p=0;for(let g of v.panelIds)this._panels.findIndex(b=>b.id===g)<u&&p++}}this.addPanelToTabGroup(s.targetTabGroupId,h,p)}else h&&s.targetTabGroupId===null&&this.removePanelFromTabGroup(h)}),this.contentContainer.onDidFocus(()=>{this.accessor.doSetGroupActive(this.groupPanel)}),this.contentContainer.onDidBlur(()=>{}),this.contentContainer.dropTarget.onDrop(s=>{this.handleDropEvent("content",s.nativeEvent,s.position,void 0,s.edge)}),this.contentContainer.pointerDropTarget.onDrop(s=>{this.handleDropEvent("content",s.nativeEvent,s.position,void 0,s.edge)}),this.tabsContainer.onWillShowOverlay(s=>{this._onWillShowOverlay.fire(s)}),this.contentContainer.dropTarget.onWillShowOverlay(s=>{this._onWillShowOverlay.fire(new ke(s,{kind:"content",panel:this.activePanel,api:this._api,group:this.groupPanel,getData:$}))}),this.contentContainer.pointerDropTarget.onWillShowOverlay(s=>{this._onWillShowOverlay.fire(new ke(s,{kind:"content",panel:this.activePanel,api:this._api,group:this.groupPanel,getData:$}))}),this._onMove,this._onDidChange,this._onDidDrop,this._onWillDrop,this._onDidAddPanel,this._onDidRemovePanel,this._onDidActivePanelChange,this._onUnhandledDragOver,this._onDidPanelTitleChange,this._onDidPanelParametersChange,this._onDidCreateTabGroup,this._onDidDestroyTabGroup,this._onDidAddPanelToTabGroup,this._onDidRemovePanelFromTabGroup,this._onDidTabGroupChange,this._onDidTabGroupCollapsedChange,this._onDidCreateTabGroup.event(()=>{this._scheduleTabGroupUpdate()}),this._onDidDestroyTabGroup.event(()=>{this._scheduleTabGroupUpdate()}),this._onDidAddPanelToTabGroup.event(()=>{this._scheduleTabGroupUpdate()}),this._onDidRemovePanelFromTabGroup.event(()=>{this._scheduleTabGroupUpdate()}),this._onDidTabGroupChange.event(()=>{this._scheduleTabGroupUpdate()}),this._onDidTabGroupCollapsedChange.event(()=>{this._scheduleTabGroupUpdate()}))}_scheduleTabGroupUpdate(){this._pendingTabGroupUpdate||(this._pendingTabGroupUpdate=!0,queueMicrotask(()=>{this._pendingTabGroupUpdate=!1,this.isDisposed||this.tabsContainer.updateTabGroups()}))}_bracketTabGroupMutation(e){return this.accessor.mutation?this.accessor.mutation("tab-group",e):e()}createTabGroup(e){return this._bracketTabGroupMutation(()=>this._doCreateTabGroup(e))}_doCreateTabGroup(e){var t;let i=(t=e?.id)!==null&&t!==void 0?t:`tg-${this.id}-${this._tabGroupIdCounter++}`,n=new Eo(i,{label:e?.label,color:e?.color,collapsed:e?.collapsed,componentParams:e?.componentParams});return this._tabGroups.push(n),this._tabGroupMap.set(i,n),this._tabGroupDisposables.set(i,new k(n.onDidChange(()=>{this._onDidTabGroupChange.fire({tabGroup:n})}),n.onDidCollapseChange(o=>{o?this._handleGroupCollapse(n):this._handleGroupExpand(n),this._onDidTabGroupCollapsedChange.fire({tabGroup:n})}),n.onDidDestroy(()=>{this._removeTabGroupInternal(n)}))),this._onDidCreateTabGroup.fire({tabGroup:n}),n}dissolveTabGroup(e){let t=this._tabGroupMap.get(e);t&&this._bracketTabGroupMutation(()=>{let i=[...t.panelIds];for(let n of i)t.removePanel(n),this._panelToTabGroup.delete(n),this._onDidRemovePanelFromTabGroup.fire({tabGroup:t,panelId:n});t.dispose()})}addPanelToTabGroup(e,t,i){let n=this._tabGroupMap.get(e);if(!n||!this._panels.some(r=>r.id===t))return;let o=this.getTabGroupForPanel(t);o?.id!==e&&this._bracketTabGroupMutation(()=>{o&&this.removePanelFromTabGroup(t),n.addPanel(t,i),this._panelToTabGroup.set(t,n),this._enforceContiguity(n,t),this._onDidAddPanelToTabGroup.fire({tabGroup:n,panelId:t})})}movePanelWithinGroup(e,t,i){let n=this._tabGroupMap.get(e);n?.containsPanel(t)&&(n.removePanel(t),n.addPanel(t,i),this._enforceContiguity(n,t),this.tabsContainer.updateTabGroups())}movePanelBetweenGroups(e,t,i){let n=this._findTabGroupForPanel(e),o=this._tabGroupMap.get(t);o&&(n&&(n.removePanel(e),this._panelToTabGroup.delete(e),this._onDidRemovePanelFromTabGroup.fire({tabGroup:n,panelId:e}),n.isEmpty&&n.dispose()),o.addPanel(e,i),this._panelToTabGroup.set(e,o),this._enforceContiguity(o,e),this._onDidAddPanelToTabGroup.fire({tabGroup:o,panelId:e}))}moveTabGroup(e,t){let i=this._tabGroupMap.get(e);if(!i||i.panelIds.length===0)return;let n=new Set(i.panelIds),o=i.panelIds.map(d=>this._panels.find(l=>l.id===d)).filter(d=>d!==void 0);if(o.length===0)return;let r=0;for(let d=0;d<Math.min(t,this._panels.length);d++)n.has(this._panels[d].id)&&r++;for(let d of o){let l=this._panels.indexOf(d);l!==-1&&this._panels.splice(l,1)}let a=t-r,s=Math.max(0,Math.min(a,this._panels.length));this._panels.splice(s,0,...o);for(let d of this._panels)this.tabsContainer.delete(d.id);for(let d=0;d<this._panels.length;d++)this.tabsContainer.openPanel(this._panels[d],d);this.tabsContainer.updateTabGroups()}_enforceContiguity(e,t){let i=this._panels.find(s=>s.id===t);if(!i)return;let n=e.indexOfPanel(t),o=this._computeGlobalIndex(e,n),r=this._panels.indexOf(i);if(r===o)return;this._panels.splice(r,1);let a=o>r?o-1:o;this._panels.splice(a,0,i),this.tabsContainer.delete(t),this.tabsContainer.openPanel(i,a)}_computeGlobalIndex(e,t){let i=e.panelIds;if(i.length<=1){let n=this._panels.find(o=>o.id===i[0]);return n?this._panels.indexOf(n):this._panels.length}for(let n=0;n<i.length;n++){if(n===t)continue;let o=this._panels.find(r=>r.id===i[n]);if(o){let r=this._panels.indexOf(o);return Math.max(0,r+(t-n))}}return this._panels.length}removePanelFromTabGroup(e){let t=this._findTabGroupForPanel(e);t&&this._bracketTabGroupMutation(()=>{t.removePanel(e),this._panelToTabGroup.delete(e),this._onDidRemovePanelFromTabGroup.fire({tabGroup:t,panelId:e}),t.isEmpty&&t.dispose()})}getTabGroups(){return this._tabGroups}updateTabGroups(){this.tabsContainer.updateTabGroups()}refreshTabGroupAccent(){this.tabsContainer.refreshTabGroupAccent()}refreshWatermark(){if(this.watermark){var e,t;this.watermark.element.remove(),(e=(t=this.watermark).dispose)===null||e===void 0||e.call(t),this.watermark=void 0}this.updateContainer()}getTabGroupForPanel(e){return this._findTabGroupForPanel(e)}_findTabGroupForPanel(e){return this._panelToTabGroup.get(e)}_removeTabGroupInternal(e){let t=this._tabGroups.indexOf(e);if(t!==-1){this._tabGroups.splice(t,1),this._tabGroupMap.delete(e.id);for(let n of e.panelIds)this._panelToTabGroup.delete(n);this._onDidDestroyTabGroup.fire({tabGroup:e});let i=this._tabGroupDisposables.get(e.id);this._tabGroupDisposables.delete(e.id),i&&(this._pendingMicrotaskDisposables.add(i),queueMicrotask(()=>{this._pendingMicrotaskDisposables.delete(i),i.dispose()}))}}_handleGroupCollapse(e){if(!this._activePanel||!e.containsPanel(this._activePanel.id))return;let t=this._panels.indexOf(this._activePanel);for(let i=t+1;i<this._panels.length;i++){let n=this._panels[i],o=this._findTabGroupForPanel(n.id);if(!o?.collapsed){this.doSetActivePanel(n),this.updateContainer();return}}for(let i=t-1;i>=0;i--){let n=this._panels[i],o=this._findTabGroupForPanel(n.id);if(!o?.collapsed){this.doSetActivePanel(n),this.updateContainer();return}}this.contentContainer.closePanel(),this.doSetActivePanel(void 0),this.updateContainer()}_handleGroupExpand(e){if(this._activePanel)return;let t=e.panelIds[0];if(t){let i=this._panels.find(n=>n.id===t);i&&(this.doSetActivePanel(i),this.updateContainer())}}restoreTabGroups(e){for(let t of e){let i=/-(\d+)$/.exec(t.id);if(i){let n=Number.parseInt(i[1],10)+1;n>this._tabGroupIdCounter&&(this._tabGroupIdCounter=n)}}for(let t of e){let i=this.createTabGroup({id:t.id,label:t.label,color:t.color,componentParams:t.componentParams}),n=this._tabGroupMap.get(i.id);for(let o of t.panelIds)this._panels.some(r=>r.id===o)&&(i.addPanel(o),this._panelToTabGroup.set(o,n),this._enforceContiguity(n,o));t.collapsed&&i.collapse(),i.isEmpty&&i.dispose()}}focusContent(){this.contentContainer.element.focus()}focusActiveTab(){this.tabsContainer.focusActiveTab()}set renderContainer(e){if(this.panels.forEach(t=>{this.renderContainer.detatch(t)}),this._overwriteRenderContainer=e,this.panels.forEach(t=>{this.rerender(t)}),this._activePanel){this.contentContainer.renderPanel(this._activePanel,{asActive:!0});let{width:t,height:i}=this.contentDimensions();this._activePanel.layout(t,i)}}get renderContainer(){var e;return(e=this._overwriteRenderContainer)!==null&&e!==void 0?e:this.accessor.overlayRenderContainer}set dropTargetContainer(e){this._overwriteDropTargetContainer=e}get dropTargetContainer(){var e;return this._location.type==="floating"&&this.accessor.rootDropTargetContainer.disabled?this.accessor.floatingDropTargetContainer:(e=this._overwriteDropTargetContainer)!==null&&e!==void 0?e:this.accessor.rootDropTargetContainer}initialize(){this.options.panels&&this.options.panels.forEach(e=>{this.doAddPanel(e)}),this.options.activePanel&&this.openPanel(this.options.activePanel),this.setActive(this.isActive,!0),this.updateContainer(),this.updateHeaderActions()}updateHeaderActions(){var e;(e=this.accessor.headerActionsService)===null||e===void 0||e.refresh(this.groupPanel)}attachHeaderAction(e,t){switch(e){case"left":this.tabsContainer.setLeftActionsElement(t);break;case"right":this.tabsContainer.setRightActionsElement(t);break;case"prefix":this.tabsContainer.setPrefixActionsElement(t);break}}rerender(e){this.contentContainer.renderPanel(e,{asActive:!1})}indexOf(e){return this.tabsContainer.indexOf(e.id)}toJSON(){var e;let t={views:this.tabsContainer.panels,activeView:(e=this._activePanel)===null||e===void 0?void 0:e.id,id:this.id};return this.locked!==!1&&(t.locked=this.locked),this.header.hidden&&(t.hideHeader=!0),this.headerPosition!=="top"&&(t.headerPosition=this.headerPosition),this._tabGroups.length>0&&(t.tabGroups=this._tabGroups.map(i=>i.toJSON())),t}moveToNext(e){var t,i,n;(t=e)!==null&&t!==void 0||(e={}),(n=(i=e).panel)!==null&&n!==void 0||(i.panel=this.activePanel);let o=e.panel?this.panels.indexOf(e.panel):-1,r;if(o<this.panels.length-1)r=o+1;else{if(e.suppressRoll)return;r=0}this.openPanel(this.panels[r])}moveToPrevious(e){var t,i,n;if((t=e)!==null&&t!==void 0||(e={}),(n=(i=e).panel)!==null&&n!==void 0||(i.panel=this.activePanel),!e.panel)return;let o=this.panels.indexOf(e.panel),r;if(o>0)r=o-1;else{if(e.suppressRoll)return;r=this.panels.length-1}this.openPanel(this.panels[r])}containsPanel(e){return this.panels.includes(e)}init(e){}update(e){}focus(){var e;(e=this._activePanel)===null||e===void 0||e.focus()}openPanel(e,t={}){(typeof t.index!="number"||t.index>this.panels.length)&&(t.index=this.panels.length);let i=!!t.skipSetActive;if(e.updateParentGroup(this.groupPanel,{skipSetActive:t.skipSetActive}),this.doAddPanel(e,t.index,{skipSetActive:i}),this.invalidateHeaderSize(),this._activePanel===e){this.contentContainer.renderPanel(e,{asActive:!0});return}i||this.doSetActivePanel(e),t.skipSetGroupActive||this.accessor.doSetGroupActive(this.groupPanel),t.skipSetActive||this.updateContainer()}removePanel(e,t){let i=typeof e=="string"?e:e.id,n=this._panels.find(o=>o.id===i);if(!n)throw new Error("invalid operation");return this._removePanel(n,t)}closeAllPanels(){if(this.panels.length>0){let e=[...this.panels];for(let t of e)this.doClose(t)}else this.accessor.removeGroup(this.groupPanel)}closePanel(e){this.doClose(e)}doClose(e){let t=this.panels.length===1&&this.accessor.groups.length===1;this.accessor.removePanel(e,t&&this.accessor.options.noPanelsOverlay==="emptyGroup"?{removeEmptyGroup:!1}:void 0)}isPanelActive(e){return this._activePanel===e}updateActions(e){this.tabsContainer.setRightActionsElement(e)}setActive(e,t=!1){if(!(!t&&this.isActive===e)){if(this._isGroupActive=e,x(this.container,"dv-active-group",e),x(this.container,"dv-inactive-group",!e),this.tabsContainer.setActive(this.isActive),!this._activePanel&&this.panels.length>0){let i=this._panels.find(n=>{let o=this._findTabGroupForPanel(n.id);return!o?.collapsed});i&&this.doSetActivePanel(i)}this.updateContainer()}}layout(e,t){var i;this._width=e,this._height=t;let{width:n,height:o}=this.contentDimensions();this.contentContainer.layout(n,o),!((i=this._activePanel)===null||i===void 0)&&i.layout&&this._activePanel.layout(n,o)}relayout(){this.invalidateHeaderSize(),this.layout(this._width,this._height)}measureHeaderSize(){let e=this.tabsContainer.element;return this.headerPosition==="top"||this.headerPosition==="bottom"?e.offsetHeight:e.offsetWidth}invalidateHeaderSize(){this._cachedHeaderSize=void 0}contentDimensions(){var e;let t=this.headerPosition==="top"||this.headerPosition==="bottom",i=(e=this._cachedHeaderSize)!==null&&e!==void 0?e:this._cachedHeaderSize=this.measureHeaderSize();return{width:t?this._width:Math.max(0,this._width-i),height:t?Math.max(0,this._height-i):this._height}}_removePanel(e,t){let i=this._activePanel===e;if(this.doRemovePanel(e),this.invalidateHeaderSize(),i&&this.panels.length>0){let n=this.mostRecentlyUsed[0];this.openPanel(n,{skipSetActive:t?.skipSetActive,skipSetGroupActive:t?.skipSetActiveGroup})}return this._activePanel&&this.panels.length===0&&this.doSetActivePanel(void 0),t?.skipSetActive||this.updateContainer(),e}doRemovePanel(e){let t=this.panels.indexOf(e);if(this._activePanel===e&&this.contentContainer.closePanel(),this.tabsContainer.delete(e.id),this._panels.splice(t,1),this.mostRecentlyUsed.includes(e)){let n=this.mostRecentlyUsed.indexOf(e);this.mostRecentlyUsed.splice(n,1)}let i=this._panelDisposables.get(e.id);i&&(i.dispose(),this._panelDisposables.delete(e.id)),this.removePanelFromTabGroup(e.id),this._onDidRemovePanel.fire({panel:e})}doAddPanel(e,t=this.panels.length,i){let n=this._panels.indexOf(e)>-1;this.tabsContainer.show(),this.contentContainer.show(),this.tabsContainer.openPanel(e,t),i?.skipSetActive?e.api.renderer==="always"&&this.contentContainer.renderPanel(e,{asActive:!1}):this.contentContainer.openPanel(e),!n&&(this.updateMru(e),this.panels.splice(t,0,e),this._panelDisposables.set(e.id,new k(e.api.onDidTitleChange(o=>this._onDidPanelTitleChange.fire(o)),e.api.onDidParametersChange(o=>this._onDidPanelParametersChange.fire(o)))),this._onDidAddPanel.fire({panel:e}))}doSetActivePanel(e){if(this._activePanel!==e){if(this._activePanel=e,e){var t,i,n;this.tabsContainer.setActivePanel(e),this.contentContainer.setLabelledBy(this.tabsContainer.getTabId(e.id)),this.contentContainer.openPanel(e);let{width:o,height:r}=this.contentDimensions();e.layout(o,r),this.updateMru(e),this.contentContainer.refreshFocusState(),this._onDidActivePanelChange.fire({panel:e,origin:(t=(i=(n=this.accessor).currentOrigin)===null||i===void 0?void 0:i.call(n))!==null&&t!==void 0?t:"user"})}this.updateAccessibleLabel()}}updateAccessibleLabel(){var e;let t=(e=this._activePanel)===null||e===void 0?void 0:e.title;t?this.container.setAttribute("aria-label",t):this.container.removeAttribute("aria-label")}updateMru(e){this.mostRecentlyUsed.includes(e)&&this.mostRecentlyUsed.splice(this.mostRecentlyUsed.indexOf(e),1),this.mostRecentlyUsed=[e,...this.mostRecentlyUsed]}updateContainer(){this.panels.forEach(n=>n.runEvents());let e=this.isEmpty||!this._activePanel;if(e&&!this.watermark){let n=this.accessor.createWatermarkComponent();n.init({containerApi:this._api,group:this.groupPanel}),this.watermark=n,C(this.watermark.element,"pointerdown",()=>{this.isActive||this.accessor.doSetGroupActive(this.groupPanel)}),this.contentContainer.element.appendChild(this.watermark.element)}if(!e&&this.watermark){var t,i;this.watermark.element.remove(),(t=(i=this.watermark).dispose)===null||t===void 0||t.call(i),this.watermark=void 0}}canDisplayOverlay(e,t,i){let n=new xt(e,i,t,$,this.accessor.getPanel(this.id));return this._onUnhandledDragOver.fire(n),n.isAccepted}canDisplayContentOverlay(e,t){if(this.locked==="no-drop-target"||this.locked&&t==="center")return!1;let i=$();return!i&&e.shiftKey&&this.location.type!=="floating"?!1:i?.viewId===this.accessor.id?!0:this.canDisplayOverlay(e,t,"content")}handleDropEvent(e,t,i,n,o){if(this.locked==="no-drop-target")return;if(e==="content"&&o){this.accessor.dockToLayoutEdge(t,i);return}function r(){switch(e){case"header":return typeof n=="number"?"tab":"header_space";case"content":return"content"}}let a=typeof n=="number"?this.panels[n]:void 0,s=new St({nativeEvent:t,position:i,panel:a,getData:()=>$(),kind:r(),group:this.groupPanel,api:this._api});if(this._onWillDrop.fire(s),s.defaultPrevented)return;let d=$();if(d?.viewId===this.accessor.id){if(e==="content"&&d.groupId===this.id&&(i==="center"||d.panelId===null&&!d.tabGroupId)||e==="header"&&d.groupId===this.id&&d.panelId===null&&!d.tabGroupId)return;if(d.panelId===null){let{groupId:c}=d;this._onMove.fire({target:i,groupId:c,index:n,tabGroupId:d.tabGroupId});return}if(this.tabsContainer.indexOf(d.panelId)!==-1&&this.tabsContainer.size===1)return;let{groupId:l,panelId:h}=d;if(this.id===l&&!i&&this.tabsContainer.indexOf(h)===n)return;this._onMove.fire({target:i,groupId:d.groupId,itemId:d.panelId,index:n})}else this._onDidDrop.fire(new Ue({nativeEvent:t,position:i,panel:a,getData:()=>$(),group:this.groupPanel,api:this._api}))}updateDragAndDropState(){this.tabsContainer.updateDragAndDropState()}dispose(){var e,t,i;super.dispose(),(e=this.watermark)===null||e===void 0||e.element.remove(),(t=this.watermark)===null||t===void 0||(i=t.dispose)===null||i===void 0||i.call(t),this.watermark=void 0;for(let n of[...this._tabGroups])n.dispose();for(let n of this._tabGroupDisposables.values())n.dispose();this._tabGroupDisposables.clear();for(let n of this._pendingMicrotaskDisposables)n.dispose();this._pendingMicrotaskDisposables.clear();for(let n of this.panels)n.dispose();this.tabsContainer.dispose(),this.contentContainer.dispose()}},kt=class extends si{constructor(e,t,i){super(e,t),this._onDidConstraintsChangeInternal=new m,this.onDidConstraintsChangeInternal=this._onDidConstraintsChangeInternal.event,this._onDidConstraintsChange=new m,this.onDidConstraintsChange=this._onDidConstraintsChange.event,this._onDidSizeChange=new m,this.onDidSizeChange=this._onDidSizeChange.event,this.addDisposables(this._onDidConstraintsChangeInternal,this._onDidConstraintsChange,this._onDidSizeChange),i&&this.initialize(i)}setConstraints(e){this._onDidConstraintsChangeInternal.fire(e)}setSize(e){this._onDidSizeChange.fire(e)}},Gi=class extends ft{get priority(){return this._priority}get snap(){return this._snap}get minimumWidth(){return this.__minimumWidth()}get minimumHeight(){return this.__minimumHeight()}get maximumHeight(){return this.__maximumHeight()}get maximumWidth(){return this.__maximumWidth()}__minimumWidth(){let e=typeof this._minimumWidth=="function"?this._minimumWidth():this._minimumWidth;return e!==this._evaluatedMinimumWidth&&(this._evaluatedMinimumWidth=e,this.updateConstraints()),e}__maximumWidth(){let e=typeof this._maximumWidth=="function"?this._maximumWidth():this._maximumWidth;return e!==this._evaluatedMaximumWidth&&(this._evaluatedMaximumWidth=e,this.updateConstraints()),e}__minimumHeight(){let e=typeof this._minimumHeight=="function"?this._minimumHeight():this._minimumHeight;return e!==this._evaluatedMinimumHeight&&(this._evaluatedMinimumHeight=e,this.updateConstraints()),e}__maximumHeight(){let e=typeof this._maximumHeight=="function"?this._maximumHeight():this._maximumHeight;return e!==this._evaluatedMaximumHeight&&(this._evaluatedMaximumHeight=e,this.updateConstraints()),e}get isActive(){return this.api.isActive}get isVisible(){return this.api.isVisible}constructor(e,t,i,n){super(e,t,n??new kt(e,t)),this._evaluatedMinimumWidth=0,this._evaluatedMaximumWidth=Number.MAX_SAFE_INTEGER,this._evaluatedMinimumHeight=0,this._evaluatedMaximumHeight=Number.MAX_SAFE_INTEGER,this._minimumWidth=0,this._minimumHeight=0,this._maximumWidth=Number.MAX_SAFE_INTEGER,this._maximumHeight=Number.MAX_SAFE_INTEGER,this._snap=!1,this._onDidChange=new m,this.onDidChange=this._onDidChange.event,typeof i?.minimumWidth=="number"&&(this._minimumWidth=i.minimumWidth),typeof i?.maximumWidth=="number"&&(this._maximumWidth=i.maximumWidth),typeof i?.minimumHeight=="number"&&(this._minimumHeight=i.minimumHeight),typeof i?.maximumHeight=="number"&&(this._maximumHeight=i.maximumHeight),this.api.initialize(this),this.addDisposables(this.api.onWillVisibilityChange(o=>{let{isVisible:r}=o,{accessor:a}=this._params;a.setVisible(this,r)}),this.api.onActiveChange(()=>{let{accessor:o}=this._params;o.doSetGroupActive(this)}),this.api.onDidConstraintsChangeInternal(o=>{(typeof o.minimumWidth=="number"||typeof o.minimumWidth=="function")&&(this._minimumWidth=o.minimumWidth),(typeof o.minimumHeight=="number"||typeof o.minimumHeight=="function")&&(this._minimumHeight=o.minimumHeight),(typeof o.maximumWidth=="number"||typeof o.maximumWidth=="function")&&(this._maximumWidth=o.maximumWidth),(typeof o.maximumHeight=="number"||typeof o.maximumHeight=="function")&&(this._maximumHeight=o.maximumHeight),this._onDidChange.fire(void 0)}),this.api.onDidSizeChange(o=>{this._onDidChange.fire({height:o.height,width:o.width})}),this._onDidChange)}setVisible(e){this.api._onDidVisibilityChange.fire({isVisible:e})}setActive(e){this.api._onDidActiveChange.fire({isActive:e})}init(e){e.maximumHeight&&(this._maximumHeight=e.maximumHeight),e.minimumHeight&&(this._minimumHeight=e.minimumHeight),e.maximumWidth&&(this._maximumWidth=e.maximumWidth),e.minimumWidth&&(this._minimumWidth=e.minimumWidth),this._priority=e.priority,this._snap=!!e.snap,super.init(e),typeof e.isVisible=="boolean"&&this.setVisible(e.isVisible)}updateConstraints(){this.api._onDidConstraintsChange.fire({minimumWidth:this._evaluatedMinimumWidth,maximumWidth:this._evaluatedMaximumWidth,minimumHeight:this._evaluatedMinimumHeight,maximumHeight:this._evaluatedMaximumHeight})}toJSON(){let e=super.toJSON(),t=n=>n===Number.MAX_SAFE_INTEGER?void 0:n,i=n=>n<=0?void 0:n;return G(G({},e),{},{minimumHeight:i(this.minimumHeight),maximumHeight:t(this.maximumHeight),minimumWidth:i(this.minimumWidth),maximumWidth:t(this.maximumWidth),snap:this.snap,priority:this.priority})}};let me="dockview: DockviewGroupPanelApiImpl not initialized";var Oo=class extends kt{get location(){if(!this._group)throw new Error(me);return this._group.model.location}get boundingBox(){if(!this._group||this._group.model.location.type==="popout")return;let e=this.accessor.element.getBoundingClientRect(),t=this._group.element.getBoundingClientRect();return{left:t.left-e.left,top:t.top-e.top,width:t.width,height:t.height}}get locked(){if(!this._group)throw new Error(me);return this._group.locked}set locked(e){if(!this._group)throw new Error(me);this._group.locked=e}constructor(e,t){super(e,"__dockviewgroup__"),this.accessor=t,this._onDidLocationChange=new m,this.onDidLocationChange=this._onDidLocationChange.event,this._onDidActivePanelChange=new m,this.onDidActivePanelChange=this._onDidActivePanelChange.event,this._onDidCollapsedChange=new m,this.onDidCollapsedChange=this._onDidCollapsedChange.event,this._onDidPeekChange=new m,this.onDidPeekChange=this._onDidPeekChange.event,this._onDidHeaderDirectionChange=new m,this.onDidHeaderDirectionChange=this._onDidHeaderDirectionChange.event,this.addDisposables(this._onDidLocationChange,this._onDidActivePanelChange,this._onDidCollapsedChange,this._onDidPeekChange,this._onDidHeaderDirectionChange,this._onDidVisibilityChange.event(i=>{i.isVisible&&this._pendingSize&&(super.setSize(this._pendingSize),this._pendingSize=void 0)}))}setSize(e){this._pendingSize=G({},e),super.setSize(e)}close(){if(this._group)return this.accessor.removeGroup(this._group)}getWindow(){return this.location.type==="popout"?this.location.getWindow():globalThis.window}setHeaderPosition(e){if(!this._group)throw new Error(me);this._group.model.headerPosition=e}getHeaderPosition(){if(!this._group)throw new Error(me);return this._group.model.headerPosition}moveTo(e){if(!this._group)throw new Error(me);this.accessor.withOrigin("api",()=>{var t,i,n,o;let r=(t=e.group)!==null&&t!==void 0?t:this.accessor.addGroup({direction:ii((i=e.position)!==null&&i!==void 0?i:"right"),skipSetActive:(n=e.skipSetActive)!==null&&n!==void 0?n:!1});this.accessor.moveGroupOrPanel({from:{groupId:this._group.id},to:{group:r,position:e.group&&(o=e.position)!==null&&o!==void 0?o:"center",index:e.index},skipSetActive:e.skipSetActive})})}maximize(){if(!this._group)throw new Error(me);this.location.type==="grid"&&this.accessor.maximizeGroup(this._group)}isMaximized(){if(!this._group)throw new Error(me);return this.accessor.isMaximizedGroup(this._group)}exitMaximized(){if(!this._group)throw new Error(me);this.isMaximized()&&this.accessor.exitMaximizedGroup()}collapse(){this._group&&this.accessor.setEdgeGroupCollapsed(this._group,!0)}expand(){this._group&&this.accessor.setEdgeGroupCollapsed(this._group,!1)}isCollapsed(){return this._group?this.accessor.isEdgeGroupCollapsed(this._group):!1}isPeeking(){return this._group?this.accessor.isEdgeGroupPeeking(this._group):!1}setAutoHide(e){this._group&&this.accessor.setEdgeGroupAutoHide(this._group,e)}isAutoHide(){return this._group?this.accessor.isEdgeGroupAutoHide(this._group):!1}initialize(e){this._group=e}};let Mo=100,Lo=100;var Te=class extends Gi{get minimumWidth(){var e;if(typeof this._explicitConstraints.minimumWidth=="number")return this._explicitConstraints.minimumWidth;let t=(e=this.activePanel)===null||e===void 0?void 0:e.minimumWidth;return typeof t=="number"?t:super.__minimumWidth()}get minimumHeight(){var e;if(typeof this._explicitConstraints.minimumHeight=="number")return this._explicitConstraints.minimumHeight;let t=(e=this.activePanel)===null||e===void 0?void 0:e.minimumHeight;return typeof t=="number"?t:super.__minimumHeight()}get maximumWidth(){var e;if(typeof this._explicitConstraints.maximumWidth=="number")return this._explicitConstraints.maximumWidth;let t=(e=this.activePanel)===null||e===void 0?void 0:e.maximumWidth;return typeof t=="number"?t:super.__maximumWidth()}get maximumHeight(){var e;if(typeof this._explicitConstraints.maximumHeight=="number")return this._explicitConstraints.maximumHeight;let t=(e=this.activePanel)===null||e===void 0?void 0:e.maximumHeight;return typeof t=="number"?t:super.__maximumHeight()}get panels(){return this._model.panels}get activePanel(){return this._model.activePanel}get size(){return this._model.size}get model(){return this._model}get locked(){return this._model.locked}set locked(e){this._model.locked=e}get header(){return this._model.header}constructor(e,t,i){var n,o,r,a,s,d;super(t,"groupview_default",{minimumHeight:(n=(o=i.constraints)===null||o===void 0?void 0:o.minimumHeight)!==null&&n!==void 0?n:Lo,minimumWidth:(r=(a=i.constraints)===null||a===void 0?void 0:a.minimumWidth)!==null&&r!==void 0?r:Mo,maximumHeight:(s=i.constraints)===null||s===void 0?void 0:s.maximumHeight,maximumWidth:(d=i.constraints)===null||d===void 0?void 0:d.maximumWidth},new Oo(t,e)),this._explicitConstraints={},this.api.initialize(this),this._model=new ki(this.element,e,t,i,this),this.addDisposables(this.model.onDidActivePanelChange(l=>{this.api._onDidActivePanelChange.fire(l)}),this.api.onDidConstraintsChangeInternal(l=>{l.minimumWidth!==void 0&&(this._explicitConstraints.minimumWidth=typeof l.minimumWidth=="function"?l.minimumWidth():l.minimumWidth),l.minimumHeight!==void 0&&(this._explicitConstraints.minimumHeight=typeof l.minimumHeight=="function"?l.minimumHeight():l.minimumHeight),l.maximumWidth!==void 0&&(this._explicitConstraints.maximumWidth=typeof l.maximumWidth=="function"?l.maximumWidth():l.maximumWidth),l.maximumHeight!==void 0&&(this._explicitConstraints.maximumHeight=typeof l.maximumHeight=="function"?l.maximumHeight():l.maximumHeight)}))}focus(){this.api.isActive||this.api.setActive(),super.focus()}initialize(){this._model.initialize()}setActive(e){super.setActive(e),this.model.setActive(e)}layout(e,t){super.layout(e,t),this.model.layout(e,t)}relayout(){this.model.relayout()}getComponent(){return this._model}toJSON(){return this.model.toJSON()}};let Ro={name:"dark",className:"dockview-theme-dark",colorScheme:"dark"},Vo={name:"light",className:"dockview-theme-light",colorScheme:"light"},$o={name:"visualStudio",className:"dockview-theme-vs",colorScheme:"dark",edgeGroupCollapsedSize:22},zi={name:"abyss",className:"dockview-theme-abyss",colorScheme:"dark",tabGroupIndicator:"none"},No={name:"dracula",className:"dockview-theme-dracula",colorScheme:"dark"},Wo={name:"abyssSpaced",className:"dockview-theme-abyss-spaced",colorScheme:"dark",gap:10,edgeGroupCollapsedSize:44,dndOverlayMounting:"absolute",dndPanelOverlay:"group",dndTabIndicator:"line",dndOverlayBorder:"2px solid var(--dv-active-sash-color)"},Ho={name:"lightSpaced",className:"dockview-theme-light-spaced",colorScheme:"light",gap:10,edgeGroupCollapsedSize:44,dndOverlayMounting:"absolute",dndPanelOverlay:"group",dndTabIndicator:"line",dndOverlayBorder:"2px solid var(--dv-active-sash-color)"},Fo={name:"nord",className:"dockview-theme-nord",colorScheme:"dark"},Bo={name:"nordSpaced",className:"dockview-theme-nord-spaced",colorScheme:"dark",gap:10,edgeGroupCollapsedSize:44,dndOverlayMounting:"absolute",dndPanelOverlay:"group",dndTabIndicator:"line",dndOverlayBorder:"2px solid var(--dv-active-sash-color)"},Uo={name:"catppuccinMocha",className:"dockview-theme-catppuccin-mocha",colorScheme:"dark"},Yo={name:"catppuccinMochaSpaced",className:"dockview-theme-catppuccin-mocha-spaced",colorScheme:"dark",gap:10,edgeGroupCollapsedSize:44,dndOverlayMounting:"absolute",dndPanelOverlay:"group",dndTabIndicator:"line",dndOverlayBorder:"2px solid var(--dv-active-sash-color)"},Xo={name:"monokai",className:"dockview-theme-monokai",colorScheme:"dark"},Zo={name:"solarizedLight",className:"dockview-theme-solarized-light",colorScheme:"light"},Jo={name:"solarizedLightSpaced",className:"dockview-theme-solarized-light-spaced",colorScheme:"light",gap:10,edgeGroupCollapsedSize:44,dndOverlayMounting:"absolute",dndPanelOverlay:"group",dndTabIndicator:"line",dndOverlayBorder:"2px solid var(--dv-active-sash-color)"},Ko={name:"githubDark",className:"dockview-theme-github-dark",colorScheme:"dark"},jo={name:"githubDarkSpaced",className:"dockview-theme-github-dark-spaced",colorScheme:"dark",gap:10,edgeGroupCollapsedSize:44,dndOverlayMounting:"absolute",dndPanelOverlay:"group",dndTabIndicator:"line",dndOverlayBorder:"2px solid var(--dv-active-sash-color)"},qo={name:"githubLight",className:"dockview-theme-github-light",colorScheme:"light"},Qo={name:"githubLightSpaced",className:"dockview-theme-github-light-spaced",colorScheme:"light",gap:10,edgeGroupCollapsedSize:44,dndOverlayMounting:"absolute",dndPanelOverlay:"group",dndTabIndicator:"line",dndOverlayBorder:"2px solid var(--dv-active-sash-color)"};var er=class extends kt{get location(){return this.group.api.location}get title(){return this.panel.title}get isPinned(){return this.panel.isPinned}get isGroupActive(){return this.group.isActive}get renderer(){return this.panel.renderer}set group(e){let t=this._group;this._group!==e&&(this._group=e,this._onDidGroupChange.fire({}),this.setupGroupEventListeners(t),this.fireLocationChange())}get group(){return this._group}get tabComponent(){return this._tabComponent}constructor(e,t,i,n,o){super(e.id,n),this.panel=e,this.accessor=i,this._onDidTitleChange=new m,this.onDidTitleChange=this._onDidTitleChange.event,this._onDidChangePinned=new m,this.onDidChangePinned=this._onDidChangePinned.event,this._onDidActiveGroupChange=new m,this.onDidActiveGroupChange=this._onDidActiveGroupChange.event,this._onDidGroupChange=new m,this.onDidGroupChange=this._onDidGroupChange.event,this._onDidRendererChange=new m,this.onDidRendererChange=this._onDidRendererChange.event,this._onDidLocationChange=new m,this.onDidLocationChange=this._onDidLocationChange.event,this.groupEventsDisposable=new H,this._tabComponent=o,this.initialize(e),this._group=t,this.setupGroupEventListeners(),this.addDisposables(this.groupEventsDisposable,this._onDidRendererChange,this._onDidTitleChange,this._onDidChangePinned,this._onDidGroupChange,this._onDidActiveGroupChange,this._onDidLocationChange)}getWindow(){return this.group.api.getWindow()}setActive(){this.accessor.withOrigin("api",()=>super.setActive())}moveTo(e){this.accessor.withOrigin("api",()=>{var t,i;return this.accessor.moveGroupOrPanel({from:{groupId:this._group.id,panelId:this.panel.id},to:{group:(t=e.group)!==null&&t!==void 0?t:this._group,position:e.group&&(i=e.position)!==null&&i!==void 0?i:"center",index:e.index},skipSetActive:e.skipSetActive})})}setTitle(e){this.panel.setTitle(e)}setPinned(e){this.accessor.setPanelPinned(this.panel,e)}setRenderer(e){this.panel.setRenderer(e)}close(){this.group.model.closePanel(this.panel)}maximize(){this.group.api.maximize()}isMaximized(){return this.group.api.isMaximized()}exitMaximized(){this.group.api.exitMaximized()}fireLocationChange(){this.accessor.deferLocationChange(this,()=>{this.isDisposed||this._onDidLocationChange.fire({location:this.location})})}setupGroupEventListeners(e){var t;let i=(t=e?.isActive)!==null&&t!==void 0?t:!1;this.groupEventsDisposable.value=new k(this.group.api.onDidVisibilityChange(n=>{let o=!n.isVisible&&this.isVisible,r=n.isVisible&&!this.isVisible,a=this.group.model.isPanelActive(this.panel);(o||r&&a)&&this._onDidVisibilityChange.fire(n)}),this.group.api.onDidLocationChange(()=>{this.group===this.panel.group&&this.fireLocationChange()}),this.group.api.onDidActiveChange(()=>{this.group===this.panel.group&&i!==this.isGroupActive&&(i=this.isGroupActive,this._onDidActiveGroupChange.fire({isActive:this.isGroupActive}))}))}},we=class extends k{get params(){return this._params}get title(){return this._title}get isPinned(){return this._pinned}get group(){return this._group}get renderer(){var e;return(e=this._renderer)!==null&&e!==void 0?e:this.accessor.renderer}get minimumWidth(){return this._minimumWidth}get minimumHeight(){return this._minimumHeight}get maximumWidth(){return this._maximumWidth}get maximumHeight(){return this._maximumHeight}constructor(e,t,i,n,o,r,a,s){super(),this.id=e,this.accessor=n,this.containerApi=o,this.view=a,this._pinned=!1,this._renderer=s.renderer,this._group=r,this._minimumWidth=s.minimumWidth,this._minimumHeight=s.minimumHeight,this._maximumWidth=s.maximumWidth,this._maximumHeight=s.maximumHeight,this.api=new er(this,this._group,n,t,i),this.addDisposables(this.api.onActiveChange(()=>{n.setActivePanel(this)}),this.api.onDidSizeChange(d=>{this.group.api.setSize(d)}),this.api.onDidRendererChange(()=>{this.group.model.rerender(this)}))}init(e){this._params=e.params,this.view.init(G(G({},e),{},{api:this.api,containerApi:this.containerApi})),this.setTitle(e.title)}focus(){let e=new ai;this.api._onWillFocus.fire(e),!e.defaultPrevented&&(this.api.isActive||this.api.setActive())}toJSON(){return{id:this.id,contentComponent:this.view.contentComponent,tabComponent:this.view.tabComponent,params:Object.keys(this._params||{}).length>0?this._params:void 0,title:this.title,renderer:this._renderer,minimumHeight:this._minimumHeight,maximumHeight:this._maximumHeight,minimumWidth:this._minimumWidth,maximumWidth:this._maximumWidth,pinned:this._pinned?!0:void 0}}setTitle(e){e!==this.title&&(this._title=e,this.view.setTitle(e),this.api._onDidTitleChange.fire({title:e}))}setPinned(e){this._pinned!==e&&(this._pinned=e,this.api._onDidChangePinned.fire({isPinned:e}))}setRenderer(e){e!==this.renderer&&(this._renderer=e,this.api._onDidRendererChange.fire({renderer:e}))}update(e){this._params=G(G({},this._params),e.params);for(let t of Object.keys(e.params))e.params[t]===void 0&&delete this._params[t];this.view.update({params:this._params})}updateFromStateModel(e){var t,i,n,o,r;this._maximumHeight=e.maximumHeight,this._minimumHeight=e.minimumHeight,this._maximumWidth=e.maximumWidth,this._minimumWidth=e.minimumWidth,this._params=(t=e.params)!==null&&t!==void 0?t:{},this.view.update({params:this._params}),this.setTitle((i=e.title)!==null&&i!==void 0?i:this.id),this.setRenderer((n=e.renderer)!==null&&n!==void 0?n:this.accessor.renderer),this.setPinned(((o=e.pinned)!==null&&o!==void 0?o:!1)&&!!(!((r=this.accessor.options.pinnedTabs)===null||r===void 0)&&r.enabled))}updateParentGroup(e,t){this._group=e,this.api.group=this._group;let i=this._group.model.isPanelActive(this),n=this.group.api.isActive&&i;t?.skipSetActive||this.api.isActive!==n&&this.api._onDidActiveChange.fire({isActive:this.group.api.isActive&&i}),this.api.isVisible!==i&&this.api._onDidVisibilityChange.fire({isVisible:i})}runEvents(){let e=this._group.model.isPanelActive(this),t=this.group.api.isActive&&e;this.api.isActive!==t&&this.api._onDidActiveChange.fire({isActive:this.group.api.isActive&&e}),this.api.isVisible!==e&&this.api._onDidVisibilityChange.fire({isVisible:e})}layout(e,t){this.api._onDidDimensionChange.fire({width:e,height:t}),this.view.layout(e,t)}dispose(){this.api.dispose(),this.view.dispose()}},Gt=class extends k{get element(){return this._element}constructor(){super(),this._messages=Re,this._element=document.createElement("div"),this._element.className="dv-default-tab",this._content=document.createElement("div"),this._content.className="dv-default-tab-content",this.action=document.createElement("div"),this.action.className="dv-default-tab-action",this.action.setAttribute("role","button"),this.action.setAttribute("tabindex","-1");let e=vi();e.setAttribute("aria-hidden","true"),this.action.appendChild(e),this._element.appendChild(this._content),this._element.appendChild(this.action),this.render()}init(e){var t;this._title=e.title,this._messages=(t=e.containerApi.messages)!==null&&t!==void 0?t:Re,this.addDisposables(e.api.onDidTitleChange(i=>{this._title=i.title,this.render()}),C(this.action,"pointerdown",i=>{i.preventDefault()}),C(this.action,"click",i=>{i.defaultPrevented||(i.preventDefault(),e.api.close())})),this.render()}render(){if(this._content.textContent!==this._title){var e;this._content.textContent=(e=this._title)!==null&&e!==void 0?e:""}this.action.setAttribute("aria-label",this._title?this._messages.closeTab(this._title):this._messages.closeTabPlain())}},Pi=class{get content(){return this._content}get tab(){return this._tab}constructor(e,t,i,n){this.accessor=e,this.id=t,this.contentComponent=i,this.tabComponent=n,this._content=this.createContentComponent(this.id,i),this._tab=this.createTabComponent(this.id,n)}createTabRenderer(e){let t=this.createTabComponent(this.id,this.tabComponent);if(this._params&&t.init(G(G({},this._params),{},{tabLocation:e})),this._updateEvent){var i;(i=t.update)===null||i===void 0||i.call(t,this._updateEvent)}return t}init(e){this._params=e,this.content.init(e),this.tab.init(G(G({},e),{},{tabLocation:"header"}))}setTitle(e){this._params&&(this._params.title=e)}layout(e,t){var i,n;(i=(n=this.content).layout)===null||i===void 0||i.call(n,e,t)}update(e){var t,i,n,o;this._updateEvent=e,(t=(i=this.content).update)===null||t===void 0||t.call(i,e),(n=(o=this.tab).update)===null||n===void 0||n.call(o,e)}dispose(){var e,t,i,n;(e=(t=this.content).dispose)===null||e===void 0||e.call(t),(i=(n=this.tab).dispose)===null||i===void 0||i.call(n)}createContentComponent(e,t){return this.accessor.options.createComponent({id:e,name:t})}createTabComponent(e,t){let i=t??this.accessor.options.defaultTabComponent;if(i){if(this.accessor.options.createTabComponent){let n=this.accessor.options.createTabComponent({id:e,name:i});return n||new Gt}console.warn(`dockview: tabComponent '${t}' was not found. falling back to the default tab.`)}return new Gt}},Ti=class{constructor(e){this.accessor=e}fromJSON(e,t){var i,n,o;let r=e.id,a=e.params,s=e.title,d=e.view,l=d?d.content.id:(i=e.contentComponent)!==null&&i!==void 0?i:"unknown",h=d?(n=d.tab)===null||n===void 0?void 0:n.id:e.tabComponent,c=new Pi(this.accessor,r,l,h),v=new we(r,l,h,this.accessor,new Ve(this.accessor),t,c,{renderer:e.renderer,minimumWidth:e.minimumWidth,minimumHeight:e.minimumHeight,maximumWidth:e.maximumWidth,maximumHeight:e.maximumHeight});return v.init({title:s??r,params:a??{}}),e.pinned&&(!((o=this.accessor.options.pinnedTabs)===null||o===void 0)&&o.enabled)&&v.setPinned(!0),v}},tr=class extends k{get element(){return this._element}constructor(){super(),this._element=document.createElement("div"),this._element.className="dv-watermark"}init(e){}},ir=class{constructor(){this._orderedList=[]}push(e){this._orderedList=[...this._orderedList.filter(t=>t!==e),e],this.update()}destroy(e){this._orderedList=this._orderedList.filter(t=>t!==e),this.update()}update(){for(let e=0;e<this._orderedList.length;e++)this._orderedList[e].setAttribute("aria-level",`${e}`),this._orderedList[e].style.zIndex=`calc(var(--dv-overlay-z-index, 999) + ${e*2})`}};let Ye=new ir;var zt=class ye extends k{set minimumInViewportWidth(t){this.options.minimumInViewportWidth=t}set minimumInViewportHeight(t){this.options.minimumInViewportHeight=t}get element(){return this._element}get isVisible(){return this._isVisible}get headerHeight(){var t,i;return(t=(i=this.options.header)===null||i===void 0?void 0:i.offsetHeight)!==null&&t!==void 0?t:0}constructor(t){super(),this.options=t,this._element=document.createElement("div"),this._onDidChange=new m,this.onDidChange=this._onDidChange.event,this._onDidChangeEnd=new m,this.onDidChangeEnd=this._onDidChangeEnd.event,this._onDidStartMoving=new m,this.onDidStartMoving=this._onDidStartMoving.event,this._dragMove=new H,this._dragCancelled=!1,this.addDisposables(this._onDidChange,this._onDidChangeEnd,this._onDidStartMoving,this._dragMove),this._element.className="dv-resize-container",this._element.setAttribute("role","dialog"),this._element.setAttribute("aria-modal","false"),this._isVisible=!0,this.setupResize("top"),this.setupResize("bottom"),this.setupResize("left"),this.setupResize("right"),this.setupResize("topleft"),this.setupResize("topright"),this.setupResize("bottomleft"),this.setupResize("bottomright"),this.options.header&&(x(this._element,"dv-resize-container-with-titlebar",!0),this._element.appendChild(this.options.header)),this._element.appendChild(this.options.content),this.options.container.appendChild(this._element),this.setBounds(G(G(G(G({height:this.options.height,width:this.options.width},"top"in this.options&&{top:this.options.top}),"bottom"in this.options&&{bottom:this.options.bottom}),"left"in this.options&&{left:this.options.left}),"right"in this.options&&{right:this.options.right})),Ye.push(this._element)}setVisible(t){t!==this.isVisible&&(this._isVisible=t,x(this.element,"dv-hidden",!this.isVisible))}bringToFront(){Ye.push(this._element)}setBounds(t={}){typeof t.height=="number"&&(this._element.style.height=`${t.height}px`),typeof t.width=="number"&&(this._element.style.width=`${t.width}px`),"top"in t&&typeof t.top=="number"&&(this._element.style.top=`${t.top}px`,this._element.style.bottom="auto",this.verticalAlignment="top"),"bottom"in t&&typeof t.bottom=="number"&&(this._element.style.bottom=`${t.bottom}px`,this._element.style.top="auto",this.verticalAlignment="bottom"),"left"in t&&typeof t.left=="number"&&(this._element.style.left=`${t.left}px`,this._element.style.right="auto",this.horiziontalAlignment="left"),"right"in t&&typeof t.right=="number"&&(this._element.style.right=`${t.right}px`,this._element.style.left="auto",this.horiziontalAlignment="right");let i=this.options.container.getBoundingClientRect(),n=this._element.getBoundingClientRect(),o=Math.max(0,this.getMinimumWidth(n.width)),r=Math.max(0,this.getMinimumHeight(n.height));if(this.verticalAlignment==="top"){let a=N(n.top-i.top,-r,Math.max(0,i.height-n.height+r));this._element.style.top=`${a}px`,this._element.style.bottom="auto"}if(this.verticalAlignment==="bottom"){let a=N(i.bottom-n.bottom,-r,Math.max(0,i.height-n.height+r));this._element.style.bottom=`${a}px`,this._element.style.top="auto"}if(this.horiziontalAlignment==="left"){let a=N(n.left-i.left,-o,Math.max(0,i.width-n.width+o));this._element.style.left=`${a}px`,this._element.style.right="auto"}if(this.horiziontalAlignment==="right"){let a=N(i.right-n.right,-o,Math.max(0,i.width-n.width+o));this._element.style.right=`${a}px`,this._element.style.left="auto"}this._onDidChange.fire()}toJSON(){let t=this.options.container.getBoundingClientRect(),i=this._element.getBoundingClientRect(),n={};return this.verticalAlignment==="top"?n.top=Number.parseFloat(this._element.style.top):this.verticalAlignment==="bottom"?n.bottom=Number.parseFloat(this._element.style.bottom):n.top=i.top-t.top,this.horiziontalAlignment==="left"?n.left=Number.parseFloat(this._element.style.left):this.horiziontalAlignment==="right"?n.right=Number.parseFloat(this._element.style.right):n.left=i.left-t.left,n.width=i.width,n.height=i.height,n}cancelPendingDrag(){this._dragMove.value&&(this._dragCancelled=!0,x(this._element,"dv-resize-container-dragging",!1),this._dragMove.value=M.NONE)}setupDrag(t,i){let n=(o,r)=>{var a,s,d;let l=null,h=!1;this._dragCancelled=!1;let c=this.options.transformDragPosition?(a=(s=(d=this.options).getSiblingBoxes)===null||s===void 0?void 0:s.call(d))!==null&&a!==void 0?a:[]:[],v=Ge();if(o&&typeof r=="number"&&typeof o.setPointerCapture=="function")try{o.setPointerCapture(r)}catch{}let p=()=>{x(this._element,"dv-resize-container-dragging",!1),this._dragMove.value=M.NONE,this._onDidChangeEnd.fire()};this._dragMove.value=new k({dispose:()=>{if(v.release(),o&&typeof r=="number"&&typeof o.releasePointerCapture=="function")try{o.releasePointerCapture(r)}catch{}}},C(globalThis.window,"pointermove",u=>{var g;if(this._dragCancelled)return;let b=this.options.container.getBoundingClientRect(),D=u.clientX-b.left,w=u.clientY-b.top;x(this._element,"dv-resize-container-dragging",!0);let _=this._element.getBoundingClientRect();(g=l)!==null&&g!==void 0||(l={x:u.clientX-_.left,y:u.clientY-_.top});let S=Math.max(0,this.getMinimumWidth(_.width)),T=Math.max(0,this.getMinimumHeight(_.height)),y=w-l.y,P=D-l.x;if(this.options.transformDragPosition){let U=this.options.transformDragPosition({proposed:{top:y,left:P,width:_.width,height:_.height},container:{width:b.width,height:b.height},others:c,modifiers:{altKey:u.altKey,ctrlKey:u.ctrlKey,metaKey:u.metaKey,shiftKey:u.shiftKey}});U&&(y=U.top,P=U.left)}let A=Math.max(0,b.height-_.height+T),O=Math.max(0,b.width-_.width+S),z=N(y,-T,A),I=N(b.height-_.height-y,-T,A),W=N(P,-S,O),B=N(b.width-_.width-P,-S,O),R={};z<=I?R.top=z:R.bottom=I,W<=B?R.left=W:R.right=B,this.setBounds(R),h||(h=!0,this._onDidStartMoving.fire())}),C(globalThis.window,"pointerup",p),C(globalThis.window,"pointercancel",p))};this.addDisposables(C(t,"pointerdown",o=>{if(o.defaultPrevented){o.preventDefault();return}Nt(o)||n(t,o.pointerId)}),C(this.options.content,"pointerdown",o=>{o.defaultPrevented||Nt(o)||o.shiftKey&&n(this.options.content,o.pointerId)}),C(this.options.content,"pointerdown",()=>{Ye.push(this._element)},!0)),i?.inDragMode&&n()}setupResize(t){let i=document.createElement("div");i.className=`dv-resize-handle-${t}`,this._element.appendChild(i);let n=new H;this.addDisposables(n,C(i,"pointerdown",o=>{o.preventDefault();let r=null,a=Ge(),s=o.pointerId;if(typeof i.setPointerCapture=="function")try{i.setPointerCapture(s)}catch{}let d=()=>{n.dispose(),this._onDidChangeEnd.fire()};n.value=new k(C(globalThis.window,"pointermove",l=>{var h;let c=this.options.container.getBoundingClientRect(),v=this._element.getBoundingClientRect(),p=l.clientY-c.top,u=l.clientX-c.left;(h=r)!==null&&h!==void 0||(r={originalY:p,originalHeight:v.height,originalX:u,originalWidth:v.width});let g,b,D,w,_,S,T=()=>{let z=r.originalY+r.originalHeight>c.height?Math.max(0,c.height-ye.MINIMUM_HEIGHT):Math.max(0,r.originalY+r.originalHeight-ye.MINIMUM_HEIGHT);g=N(p,0,z),D=r.originalY+r.originalHeight-g,b=c.height-g-D},y=()=>{g=r.originalY-r.originalHeight;let z=g<0&&typeof this.options.minimumInViewportHeight=="number"?-g+this.options.minimumInViewportHeight:ye.MINIMUM_HEIGHT,I=c.height-Math.max(0,g);D=N(p-g,z,I),b=c.height-g-D},P=()=>{let z=r.originalX+r.originalWidth>c.width?Math.max(0,c.width-ye.MINIMUM_WIDTH):Math.max(0,r.originalX+r.originalWidth-ye.MINIMUM_WIDTH);w=N(u,0,z),S=r.originalX+r.originalWidth-w,_=c.width-w-S},A=()=>{w=r.originalX-r.originalWidth;let z=w<0&&typeof this.options.minimumInViewportWidth=="number"?-w+this.options.minimumInViewportWidth:ye.MINIMUM_WIDTH,I=c.width-Math.max(0,w);S=N(u-w,z,I),_=c.width-w-S};switch(t){case"top":T();break;case"bottom":y();break;case"left":P();break;case"right":A();break;case"topleft":T(),P();break;case"topright":T(),A();break;case"bottomleft":y(),P();break;case"bottomright":y(),A();break}let O={};g<=b?O.top=g:O.bottom=b,w<=_?O.left=w:O.right=_,O.height=D,O.width=S,this.setBounds(O)}),{dispose:()=>{if(a.release(),typeof i.releasePointerCapture=="function")try{i.releasePointerCapture(s)}catch{}}},C(globalThis.window,"pointerup",d),C(globalThis.window,"pointercancel",d))}))}getMinimumWidth(t){return typeof this.options.minimumInViewportWidth=="number"?t-this.options.minimumInViewportWidth:0}getMinimumHeight(t){return typeof this.options.minimumInViewportHeight=="number"?t-this.options.minimumInViewportHeight:0}dispose(){Ye.destroy(this._element),this._element.remove(),super.dispose()}};zt.MINIMUM_HEIGHT=20,zt.MINIMUM_WIDTH=20;var nr=class extends k{get element(){return this._element}get group(){return this._group}setGroup(e){this._group=e}constructor(e,t){super(),this.accessor=e,this._onDragStart=new m,this.onDragStart=this._onDragStart.event,this._group=t,this._element=document.createElement("div"),this._element.className="dv-floating-titlebar",this.addDisposables(this._onDragStart,C(this._element,"pointerdown",()=>{this.accessor.doSetGroupActive(this._group)}),C(this._element,"pointerdown",i=>{i.shiftKey&&$t(i)},!0)),this.dragSource=new gi({element:this._element,accessor:this.accessor,group:()=>this._group}),this.addDisposables(this.dragSource,this.dragSource.onDragStart(i=>{this._onDragStart.fire(i)}))}updateDragAndDropState(){this.dragSource.updateDragAndDropState()}};function ce(e){return{moduleName:e.name,options:e.options,services:{[e.serviceKey]:e.create},init:e.init?(t,i)=>e.init(t,i[e.serviceKey]):void 0,dependsOn:e.dependsOn}}let or=new Set(["AdvancedOverflow","AutoEdgeGroup","AutoHideEdgeGroup","DndCompass","KeyboardDocking","KeyboardNavigation","LayoutHistory","License","MultiRowTabs","PinnedTabs","SmartGuides"]),Ii=new Set;function Ai(e,t){let i=t===void 0?[]:[].concat(t),n=i.map(a=>`\`${a}\``).join(", "),o=i.length>1?"require":"requires",r=i.length?`${n} ${o} the "${e}" module`:`The "${e}" module is required`;return or.has(e)?`dockview: ${r}, which ships in dockview-enterprise.

  npm install dockview-enterprise
  import 'dockview-enterprise'; // self-registers every enterprise module
`:`dockview: ${r}, but it is not registered.`}function Ei(e,t){let i=`${e}|${(t===void 0?[]:[].concat(t)).join("|")}`;Ii.has(i)||(Ii.add(i),console.error(Ai(e,t)))}function ee(e,t,i){if(e!==void 0)return e;Ei(t,i)}var rr=class{constructor(){this._modules=new Map,this._services={},this._initDisposables=[]}get services(){return this._services}register(e){if(!this._modules.has(e.moduleName)){if(e.dependsOn)for(let t of e.dependsOn)this.register(t);this._modules.set(e.moduleName,e)}}initialize(e){for(let t of this._modules.values())if(t.services)for(let[i,n]of Object.entries(t.services))this._services[i]=n(e)}postConstruct(e){for(let t of this._modules.values())t.init&&this._initDisposables.push(t.init(e,this._services))}has(e){return this._modules.has(e)}dispose(){for(let e of this._initDisposables)e.dispose();this._initDisposables.length=0;for(let e of Object.values(this._services))e!==void 0&&typeof e.dispose=="function"&&e.dispose()}};let Xe=[];function ar(e){for(let t of e)Xe.some(i=>i.moduleName===t.moduleName)||Xe.push(t)}function Oi(){return[...Xe]}function sr(){Xe.length=0}let dr=[{optionKey:"smartGuides",reason:"smartGuides",moduleName:"SmartGuides",when:e=>!!e.smartGuides&&e.smartGuides.enabled!==!1},{optionKey:"layoutHistory",reason:"layoutHistory.enabled: true",moduleName:"LayoutHistory",when:e=>{var t;return((t=e.layoutHistory)===null||t===void 0?void 0:t.enabled)===!0}},{optionKey:"pinnedTabs",reason:"pinnedTabs.enabled: true",moduleName:"PinnedTabs",when:e=>{var t;return((t=e.pinnedTabs)===null||t===void 0?void 0:t.enabled)===!0}},{optionKey:"overflow",reason:"overflow.mode: 'wrap'",moduleName:"MultiRowTabs",when:e=>{var t;return((t=e.overflow)===null||t===void 0?void 0:t.mode)==="wrap"}},{optionKey:"overflow",reason:"overflow.maxRows",moduleName:"MultiRowTabs",when:e=>{var t;return((t=e.overflow)===null||t===void 0?void 0:t.maxRows)!=null}},{optionKey:"overflow",reason:"overflow.search",moduleName:"AdvancedOverflow",when:e=>{var t;return!!(!((t=e.overflow)===null||t===void 0)&&t.search)}},{optionKey:"overflow",reason:"overflow.mru",moduleName:"AdvancedOverflow",when:e=>{var t;return!!(!((t=e.overflow)===null||t===void 0)&&t.mru)}},{optionKey:"autoHideEdgeGroups",reason:"autoHideEdgeGroups",moduleName:"AutoHideEdgeGroup",when:e=>We(e.autoHideEdgeGroups)},{optionKey:"dockToEdgeGroups",reason:"dockToEdgeGroups",moduleName:"AutoEdgeGroup",when:e=>We(e.dockToEdgeGroups)},{optionKey:"dndCompass",reason:"dndCompass",moduleName:"DndCompass",when:e=>!!e.dndCompass},{optionKey:"keyboardNavigation",reason:"keyboardNavigation",moduleName:"KeyboardNavigation",when:e=>!!e.keyboardNavigation}];function lr(e,t){let i=new Map;for(let n of dr){if(!n.when(e)||t(n.moduleName))continue;let o=i.get(n.moduleName);o?o.push(n.reason):i.set(n.moduleName,[n.reason])}for(let[n,o]of i)Ei(n,o)}let fe={left:100,top:100,width:300,height:300};var hr=class extends k{get group(){return this._group}setTitleBar(e){this._titleBar=e}setAnchorGroup(e){var t;this._group=e,(t=this._titleBar)===null||t===void 0||t.setGroup(e)}constructor(e,t,i){super(),this.overlay=t,this.gridview=i,this._group=e,this.addDisposables(t,{dispose:()=>this.gridview.dispose()})}position(e){this.overlay.setBounds(e)}},cr=class{get floatingGroups(){return this._floatingGroups}constructor(e){this._floatingGroups=[],this._host=e}add(e,t,i){let n=new hr(e,t,i),o=new k(e.api.onDidActiveChange(a=>{a.isActive&&t.bringToFront()}),(()=>{let a=-1,s=-1;return _e(i.element,d=>{let l=Math.round(d.contentRect.width),h=Math.round(d.contentRect.height);l===a&&h===s||(a=l,s=h,i.layout(l,h))})})()),r=()=>{var a;let s=(a=e.activePanel)===null||a===void 0?void 0:a.title;s?t.element.setAttribute("aria-label",s):t.element.removeAttribute("aria-label")};return r(),n.addDisposables(e.api.onDidActivePanelChange(()=>r()),t.onDidChange(()=>{i.layout(i.width,i.height)}),t.onDidChangeEnd(()=>{this._host.fireLayoutChange()}),e.onDidChange(a=>{t.setBounds({height:typeof a?.height=="number"?a.height+t.headerHeight:a?.height,width:a?.width})}),{dispose:()=>{o.dispose(),Ft(this._floatingGroups,n),e.model.location={type:"grid"}}}),this._floatingGroups.push(n),n}findByGroup(e){return this._floatingGroups.find(t=>t.group===e||t.gridview.element.contains(e.element))}serialize(){return this._floatingGroups.map(e=>{let t=e.gridview.serialize(),i=e.overlay.toJSON(),n=t.root;return n.type==="branch"&&n.data.length===1&&n.data[0].type==="leaf"?{data:n.data[0].data,position:i}:{grid:t,position:i}})}constrainBounds(){for(let e of this._floatingGroups)e.overlay.setBounds()}updateBounds(e){if("floatingGroupBounds"in e)for(let n of this._floatingGroups){switch(e.floatingGroupBounds){case"boundedWithinViewport":n.overlay.minimumInViewportHeight=void 0,n.overlay.minimumInViewportWidth=void 0;break;case void 0:n.overlay.minimumInViewportHeight=100,n.overlay.minimumInViewportWidth=100;break;default:var t,i;n.overlay.minimumInViewportHeight=(t=e.floatingGroupBounds)===null||t===void 0?void 0:t.minimumHeightWithinViewport,n.overlay.minimumInViewportWidth=(i=e.floatingGroupBounds)===null||i===void 0?void 0:i.minimumWidthWithinViewport}n.overlay.setBounds()}}disposeAll(){for(let e of[...this._floatingGroups])e.dispose()}dispose(){this.disposeAll()}};let Mi=ce({name:"FloatingGroup",serviceKey:"floatingGroupService",create:e=>new cr(e)});var vr=class{constructor(e){this._entries=[],this._restorationCleanups=new Set,this._restorationPromise=Promise.resolve(),this._onDidRemove=new m,this.onDidRemove=this._onDidRemove.event,this._host=e}get entries(){return this._entries}get restorationPromise(){return this._restorationPromise}add(e){this._entries.push(e)}remove(e){Ft(this._entries,e)&&!this._host.isDisposed&&this._onDidRemove.fire(e)}findByGroup(e){return this._entries.find(t=>t.popoutGroup===e||t.gridview.element.contains(e.element))}findReferenceGroupId(e){var t;return(t=this._entries.find(i=>i.popoutGroup===e))===null||t===void 0?void 0:t.referenceGroup}observeGridviewSize(e,t,i){var n;let o=(n=e.window)===null||n===void 0?void 0:n.ResizeObserver;if(!o)return;let r=-1,a=-1,s=()=>{let l=e.window;if(this._host.isDisposed||!l||l.closed)return;let h=Math.round(t.element.clientWidth),c=Math.round(t.element.clientHeight);h===r&&c===a||(r=h,a=c,h>0&&c>0&&t.layout(h,c),i.updateAllPositions())},d=new o(()=>{var l;let h=(l=e.window)===null||l===void 0?void 0:l.requestAnimationFrame;h?h.call(e.window,s):s()});return d.observe(t.element),{dispose:()=>d.disconnect()}}scheduleRestoration(e,t,i){return new Promise(n=>{let o=()=>{this._restorationCleanups.delete(o),clearTimeout(r),i?.(),n()},r=setTimeout(()=>{if(this._restorationCleanups.delete(o),this._host.isDisposed){n();return}t(),n()},e);this._restorationCleanups.add(o)})}finishRestoration(e){this._restorationPromise=Promise.all(e).then(()=>{})}cancelPendingRestorations(){for(let e of[...this._restorationCleanups])e();this._restorationCleanups.clear()}serialize(){return this._entries.map(e=>{let t=e.gridview.serialize(),i=t.root,n=e.popoutGroup.api.location.type==="popout"?e.popoutGroup.api.location.popoutUrl:void 0,o={gridReferenceGroup:e.referenceGroup,position:e.window.dimensions(),url:n};return i.type==="branch"&&i.data.length===1&&i.data[0].type==="leaf"?G(G({},o),{},{data:i.data[0].data}):G(G({},o),{},{grid:t})})}disposeAll(){for(let e of[...this._entries])e.disposable.dispose()}dispose(){this.cancelPendingRestorations(),this.disposeAll(),this._onDidRemove.dispose()}};let pr=ce({name:"PopoutWindow",serviceKey:"popoutWindowService",create:e=>new vr(e)});var ur=class{constructor(e){this._watermark=null,this._host=e}update(){if(this._host.hasVisibleGridGroup()){this._unmount();return}if(this._watermark)return;this._watermark=this._host.createWatermarkComponent(),this._watermark.init({containerApi:this._host.api});let e=document.createElement("div");e.className="dv-watermark-container",Cn(e,"watermark-component"),e.appendChild(this._watermark.element),this._host.mountElement.appendChild(e)}refresh(){this._unmount(),this.update()}_unmount(){var e,t;this._watermark&&(this._watermark.element.parentElement.remove(),(e=(t=this._watermark).dispose)===null||e===void 0||e.call(t),this._watermark=null)}dispose(){this._unmount()}};let gr=ce({name:"Watermark",serviceKey:"watermarkService",create:e=>new ur(e),init:(e,t)=>(t.update(),new k(q.any(e.onDidAdd,e.onDidRemove)(()=>{t.update()}),e.onDidViewVisibilityChangeMicroTaskQueue(()=>{t.update()})))});var mr=class{constructor(){this._edgeGroups=new Map,this._edgeGroupDisposables=new Map,this._autoHide=new WeakMap,this._autoReveal=new WeakMap}add(e,t,i){this._edgeGroups.set(e,t),this._edgeGroupDisposables.set(e,i)}remove(e){var t;(t=this._edgeGroupDisposables.get(e))===null||t===void 0||t.dispose(),this._edgeGroupDisposables.delete(e),this._edgeGroups.delete(e)}get(e){return this._edgeGroups.get(e)}has(e){return this._edgeGroups.has(e)}hasAny(){return this._edgeGroups.size>0}entries(){return this._edgeGroups.entries()}includes(e){for(let t of this._edgeGroups.values())if(t===e)return!0;return!1}findPositionOf(e){for(let[t,i]of this._edgeGroups)if(i===e)return t}setAutoHide(e,t){t===void 0?this._autoHide.delete(e):this._autoHide.set(e,t)}isAutoHide(e){return this._autoHide.get(e)}setAutoReveal(e,t){this._autoReveal.set(e,t)}isAutoReveal(e){var t;return(t=this._autoReveal.get(e))!==null&&t!==void 0?t:!1}disposeAll(){for(let e of this._edgeGroupDisposables.values())e.dispose();this._edgeGroupDisposables.clear(),this._edgeGroups.clear()}dispose(){this.disposeAll()}};let Li=ce({name:"EdgeGroup",serviceKey:"edgeGroupService",create:()=>new mr}),br={activationSize:{type:"pixels",value:10},size:{type:"pixels",value:20}},fr={activationSize:{type:"pixels",value:32},size:{type:"pixels",value:20}};function Ri(e,t){return typeof e.dndEdges=="object"&&e.dndEdges!==null?e.dndEdges:t&&We(e.dockToEdgeGroups)?fr:br}var _r=class{constructor(e){this._host=e;let t=(n,o)=>{let r=$();return r?r.viewId!==e.id?!1:o==="center"?e.isGridEmpty():!0:o==="center"&&!e.isGridEmpty()?!1:e.dispatchUnhandledDragOver(n,o)},i=Ri(e.options,!1);this._html5Target=ge.createDropTarget(e.element,{className:"dv-drop-target-edge",canDisplayOverlay:t,acceptedTargetZones:["top","bottom","left","right","center"],overlayModel:i,getOverrideTarget:()=>e.rootDropTargetOverrideTarget(),getPositionResolver:()=>e.options.dropPositionResolver}),this._pointerTarget=le.createDropTarget(e.element,{className:"dv-drop-target-edge",canDisplayOverlay:t,acceptedTargetZones:["top","bottom","left","right","center"],overlayModel:i,getOverrideTarget:()=>e.rootDropTargetOverrideTarget(),getPositionResolver:()=>e.options.dropPositionResolver}),this.onWillShowOverlay=q.any(this._html5Target.onWillShowOverlay,this._pointerTarget.onWillShowOverlay),this.onDrop=q.any(this._html5Target.onDrop,this._pointerTarget.onDrop),this.setOptions(e.options)}setOptions(e){if("dndEdges"in e){let t=typeof e.dndEdges=="boolean"&&e.dndEdges===!1;this._html5Target.disabled=t,this._pointerTarget.disabled=t}if("dndEdges"in e||"dockToEdgeGroups"in e){let t=Ri({dndEdges:"dndEdges"in e?e.dndEdges:this._host.options.dndEdges,dockToEdgeGroups:"dockToEdgeGroups"in e?e.dockToEdgeGroups:this._host.options.dockToEdgeGroups},this._host.hasEdgeDragReveal);this._html5Target.setOverlayModel(t),this._pointerTarget.setOverlayModel(t)}}dispose(){this._html5Target.dispose(),this._pointerTarget.dispose()}};let wr=ce({name:"RootDropTarget",serviceKey:"rootDropTargetService",create:e=>new _r(e),init:(e,t)=>(t.setOptions(e.options),M.NONE)}),Dr={left:"createLeftHeaderActionComponent",right:"createRightHeaderActionComponent",prefix:"createPrefixHeaderActionComponent"};var xr=class{constructor(e){this._perGroup=new Map,this._host=e}refresh(e){if(!e?.model)return;let t=this._ensureState(e);this._refreshSlot("left",e,t.left),this._refreshSlot("right",e,t.right),this._refreshSlot("prefix",e,t.prefix)}refreshAll(){for(let e of this._host.groups)this.refresh(e)}disposeGroup(e){let t=this._perGroup.get(e);t&&(t.left.dispose(),t.right.dispose(),t.prefix.dispose(),this._perGroup.delete(e))}dispose(){for(let e of[...this._perGroup.keys()])this.disposeGroup(e)}_ensureState(e){let t=this._perGroup.get(e);return t||(t={left:new H,right:new H,prefix:new H},this._perGroup.set(e,t)),t}_refreshSlot(e,t,i){let n=this._host.options[Dr[e]];if(n){let o=n(t);i.value=o,o.init({containerApi:this._host.api,api:t.api,group:t}),t.model.attachHeaderAction(e,o.element)}else i.dispose(),t.model.attachHeaderAction(e,void 0)}};let yr=ce({name:"HeaderActions",serviceKey:"headerActionsService",create:e=>new xr(e),init:(e,t)=>new k(e.onDidRemoveGroup(i=>{t.disposeGroup(i)}))}),Vi=e=>e==="load"||e==="clear";function Ze(e,t){let i=e.createElement("div");return i.className=t==="assertive"?"dv-live-region-assertive":"dv-live-region",i.setAttribute("role",t==="assertive"?"alert":"status"),i.setAttribute("aria-live",t),i.setAttribute("aria-atomic","true"),Object.assign(i.style,{position:"absolute",width:"1px",height:"1px",margin:"-1px",padding:"0",overflow:"hidden",clip:"rect(0 0 0 0)",clipPath:"inset(50%)",whiteSpace:"nowrap",border:"0"}),i}var Cr=class extends k{constructor(e){var t;super(),this._regions=new Map,this._suppressDepth=0,this._locationSubs=new Map,this._host=e;let i=e.element.ownerDocument;this._mainWindow=(t=i.defaultView)!==null&&t!==void 0?t:window;let n={polite:Ze(i,"polite"),assertive:Ze(i,"assertive")};e.element.appendChild(n.polite),e.element.appendChild(n.assertive),this._regions.set(this._mainWindow,n),this._syncPopoutRegions(),this.addDisposables({dispose:()=>this._disposeRegions()},e.onDidChangePopouts(()=>this._syncPopoutRegions()),e.onDidAddPanel(o=>this._announce(o,"open")),e.onDidRemovePanel(o=>this._announce(o,"close")),e.onWillMutateLayout(o=>{Vi(o.kind)&&this._suppressDepth++}),e.onDidMutateLayout(o=>{Vi(o.kind)&&(this._suppressDepth=Math.max(0,this._suppressDepth-1))}),e.onDidMaximizedGroupChange(o=>{let r=o.group.activePanel;r&&this._announce(r,o.isMaximized?"maximize":"restore")}),e.onDidAddGroup(o=>this._trackLocation(o)),e.onDidRemoveGroup(o=>{var r;(r=this._locationSubs.get(o.id))===null||r===void 0||r.dispose(),this._locationSubs.delete(o.id)}),{dispose:()=>{this._locationSubs.forEach(o=>o.dispose()),this._locationSubs.clear()}})}_syncPopoutRegions(){let e=this._host.element.ownerDocument,t=new Set([this._mainWindow]);for(let n of this._host.getPopoutWindows()){var i;if(n.document===e||(t.add(n),this._regions.has(n)))continue;let o=n.document,r=(i=o.body)!==null&&i!==void 0?i:o.documentElement,a={polite:Ze(o,"polite"),assertive:Ze(o,"assertive")};r.appendChild(a.polite),r.appendChild(a.assertive),this._regions.set(n,a)}for(let[n,o]of this._regions)t.has(n)||(o.polite.remove(),o.assertive.remove(),this._regions.delete(n))}_disposeRegions(){for(let e of this._regions.values())e.polite.remove(),e.assertive.remove();this._regions.clear()}_focusedRegions(){for(let[e,t]of this._regions)if(e!==this._mainWindow)try{if(e.document.hasFocus())return t}catch{}return this._regions.get(this._mainWindow)}_trackLocation(e){let t=e.api.location.type,i=e.api.onDidLocationChange(n=>{let o=n.location.type;if(o===t)return;t=o;let r=e.activePanel;if(!r)return;let a;switch(o){case"floating":a="float";break;case"popout":a="popout";break;default:a="dock";break}this._announce(r,a)});this._locationSubs.set(e.id,i)}announce(e,t="polite"){if(this._host.options.announcements===!1||this._suppressDepth>0||!e)return;let i=this._host.options.announcer;if(i){i({message:e,politeness:t});return}let n=this._focusedRegions(),o=t==="assertive"?n.assertive:n.polite;o.textContent="",o.textContent=e}_announce(e,t){var i,n;let o=(i=(n=this._host.options).getAnnouncement)===null||i===void 0?void 0:i.call(n,{kind:t,panel:e});o===null||o===""||this.announce(o??this._defaultMessage(e,t))}_defaultMessage(e,t){var i;let n=ut(this._host.options.messages),o=(i=e.title)!==null&&i!==void 0?i:e.id;switch(t){case"open":return n.panelOpened(o);case"close":return n.panelClosed(o);case"maximize":return n.groupMaximized(o);case"restore":return n.groupRestored(o);case"float":return n.groupFloated(o);case"dock":return n.groupDocked(o);case"popout":return n.groupPoppedOut(o)}}};let $i=ce({name:"LiveRegion",serviceKey:"liveRegionService",create:e=>new Cr(e)}),Sr=30,kr=-10;var Ni=class{constructor(e){this.host=e}dispatchWillDragPanel(e){this.host.fireWillDragPanel(e)}dispatchWillDragGroup(e){this.host.fireWillDragGroup(e)}dispatchWillDrop(e){this.host.fireWillDrop(e)}dispatchWillShowOverlay(e){this.host.fireWillShowOverlay(e)}buildGroupDragGhost(e){let t=this.host.options.createGroupDragGhostComponent;if(!t)return;let i=t(e);return i.init({group:e,api:this.host.api}),{element:i.element,offsetX:Sr,offsetY:kr,dispose:i.dispose?()=>{var n;return(n=i.dispose)===null||n===void 0?void 0:n.call(i)}:void 0}}resolveOverlayModel(e,t){var i,n;return(i=(n=this.host.options).dropOverlayModel)===null||i===void 0?void 0:i.call(n,{location:e,group:t})}showPreviewOverlay(e,t){let i=e.model.contentDropTarget;return i.showOverlay(t),M.from(()=>i.clearOverlay())}dispose(){}};let Wi=ce({name:"AdvancedDnD",serviceKey:"advancedDnDService",create:e=>new Ni(e)});var Hi=class{constructor(e){this._host=e}attachToGroup(e){return new k(e.model.onDidCreateTabGroup(t=>{this._host.fireDidCreateTabGroup(t)}),e.model.onDidDestroyTabGroup(t=>{this._host.fireDidDestroyTabGroup(t)}),e.model.onDidAddPanelToTabGroup(t=>{this._host.fireDidAddPanelToTabGroup(t)}),e.model.onDidRemovePanelFromTabGroup(t=>{this._host.fireDidRemovePanelFromTabGroup(t)}),e.model.onDidTabGroupChange(t=>{this._host.fireDidTabGroupChange(t)}),e.model.onDidTabGroupCollapsedChange(t=>{this._host.fireDidTabGroupCollapsedChange(t)}))}dispose(){}};let Fi=ce({name:"TabGroupChips",serviceKey:"tabGroupChipsService",create:e=>new Hi(e),init:(e,t)=>{let i=new Map;return new k(e.onDidAddGroup(n=>{i.set(n,t.attachToGroup(n))}),e.onDidRemoveGroup(n=>{var o;(o=i.get(n))===null||o===void 0||o.dispose(),i.delete(n)}),{dispose:()=>{for(let n of i.values())n.dispose();i.clear()}})}});function Bi(e,t){var i,n;if(!((i=t.api)===null||i===void 0||(n=i.isPeeking)===null||n===void 0)&&n.call(i))return"calc(var(--dv-overlay-z-index, 999) + 100)";if(!(e instanceof HTMLElement))return;let o=it(e);return o?.style.zIndex?`calc(${o.style.zIndex} * 2)`:void 0}let Gr=0,zr=()=>`dv-ctx-menu-item-${Gr++}`;function Ui(e){return typeof e=="object"}function ie(e,t,i,n){let o=document.createElement("div");return o.className="dv-context-menu-item",o.setAttribute("role","menuitem"),n&&(o.classList.add("dv-context-menu-item--disabled"),o.setAttribute("aria-disabled","true")),o.textContent=e,n||o.addEventListener("click",()=>{i(),t()}),o}function Yi(){let e=document.createElement("div");return e.className="dv-context-menu-separator",e.setAttribute("role","separator"),e}function Pr(){if(globalThis.window===void 0||!globalThis.matchMedia)return!1;let e=globalThis.matchMedia("(pointer: coarse)").matches,t=globalThis.matchMedia("(pointer: fine)").matches;return e&&!t}function Tr(e){let t=document.createElement("div");t.className="dv-context-menu-rename";let i=document.createElement("input");return i.className="dv-context-menu-rename-input",i.type="text",i.placeholder="Name This Group",i.value=e.label,i.addEventListener("input",()=>{e.setLabel(i.value)}),i.addEventListener("keydown",n=>{n.key!=="Escape"&&n.key!=="Enter"&&n.stopPropagation()}),i.addEventListener("click",n=>{n.stopPropagation()}),t.appendChild(i),Pr()||requestAnimationFrame(()=>{i.focus(),i.select()}),t}function Ir(e,t){let i=document.createElement("div");if(i.className="dv-context-menu-color-picker",!t.enabled)return i;for(let n of t.entries()){let o=document.createElement("div");o.className="dv-context-menu-color-swatch",o.style.setProperty("--dv-tab-group-color",n.value),n.label&&(o.title=n.label),e.color===n.id&&o.classList.add("dv-context-menu-color-swatch--selected"),o.addEventListener("click",()=>{e.setColor(n.id)}),i.appendChild(o)}return i}var Xi=class{constructor(e){this.accessor=e}buildMaximizeItem(e,t){let i=e.api.isMaximized();return ie(i?"Restore":"Maximize",t,i?()=>e.api.exitMaximized():()=>e.api.maximize(),!i&&e.api.location.type!=="grid")}buildCollapseItem(e,t){return ie(e.collapsed?"Expand":"Collapse",t,()=>e.toggle())}_shouldInjectPin(){let e=this.accessor.options.pinnedTabs;return!!this.accessor.pinnedTabsService&&!!e?.enabled&&e.contextMenuItem!==!1}_resolveTabItems(e,t,i){var n,o,r;let a=(n=(o=(r=this.accessor.options).getTabContextMenuItems)===null||o===void 0?void 0:o.call(r,{panel:e,group:t,api:this.accessor.api,event:i}))!==null&&n!==void 0?n:[];return this._shouldInjectPin()?["pin",...a]:a}appendComponentItem(e,t,i,n,o){var r,a;let s=(r=(a=this.accessor.options).createContextMenuItemComponent)===null||r===void 0?void 0:r.call(a,{id:zr(),component:t.component});s&&(s.init(G(G({},i),{},{group:n,api:this.accessor.api,close:o,componentProps:t.componentProps})),e.appendChild(s.element))}buildBuiltInTabItem(e,t,i,n){switch(e){case"separator":return Yi();case"close":return ie("Close",n,()=>t.api.close());case"closeOthers":return ie("Close Others",n,()=>{i.panels.filter(o=>o!==t).forEach(o=>o.api.close())});case"closeAll":return ie("Close All",n,()=>{[...i.panels].forEach(o=>o.api.close())});case"closeLeft":{let o=i.panels.indexOf(t);return ie("Close to the Left",n,()=>{i.panels.filter((r,a)=>a<o).forEach(r=>r.api.close())},o<=0)}case"closeRight":{let o=i.panels.indexOf(t);return ie("Close to the Right",n,()=>{i.panels.filter((r,a)=>a>o).forEach(r=>r.api.close())},o===-1||o>=i.panels.length-1)}case"maximize":return this.buildMaximizeItem(t,n);case"float":return ie("Float",n,()=>this.accessor.api.addFloatingGroup(t),t.api.location.type==="floating");case"popout":return ie("Open in New Window",n,()=>{this.accessor.api.addPopoutGroup(t)},t.api.location.type==="popout");case"pin":return ie(t.api.isPinned?"Unpin tab":"Pin tab",n,()=>t.api.setPinned(!t.api.isPinned));default:return}}appendConfigItem(e,t,i,n,o){t.element?e.appendChild(t.element):t.component?this.appendComponentItem(e,t,i,n,o):t.label&&e.appendChild(ie(t.label,o,()=>{var r;return(r=t.action)===null||r===void 0?void 0:r.call(t)},t.disabled))}show(e,t,i){let n=this._resolveTabItems(e,t,i);if(n.length===0)return;i.preventDefault();let o=this.accessor.getPopupServiceForGroup(t),r=()=>o.close(),a=document.createElement("div");a.className="dv-context-menu",a.setAttribute("role","menu");for(let s of n){if(Ui(s)){this.appendConfigItem(a,s,{panel:e},t,r);continue}let d=this.buildBuiltInTabItem(s,e,t,r);d&&a.appendChild(d)}o.openPopover(a,{x:i.clientX,y:i.clientY,zIndex:Bi(i.target,t)})}showForChip(e,t,i){if(!this.accessor.options.getTabGroupChipContextMenuItems)return;let n=this.accessor.options.getTabGroupChipContextMenuItems({tabGroup:e,group:t,api:this.accessor.api,event:i});if(n.length===0)return;i.preventDefault();let o=this.accessor.getPopupServiceForGroup(t),r=()=>o.close(),a=document.createElement("div");a.className="dv-context-menu",a.setAttribute("role","menu");for(let s of n)s==="separator"?a.appendChild(Yi()):s==="rename"?a.appendChild(Tr(e)):s==="colorPicker"?a.appendChild(Ir(e,this.accessor.tabGroupColorPalette)):s==="collapse"?a.appendChild(this.buildCollapseItem(e,r)):s==="close"?a.appendChild(ie("Close All",r,()=>{t.panels.filter(d=>e.containsPanel(d.id)).forEach(d=>d.api.close())})):Ui(s)&&this.appendConfigItem(a,s,{tabGroup:e},t,r);o.openPopover(a,{x:i.clientX,y:i.clientY,zIndex:Bi(i.target,t)})}};let Zi=ce({name:"ContextMenu",serviceKey:"contextMenuService",create:e=>new Xi(e)}),Ar=[Mi,pr,gr,Li,wr,yr,$i,Wi,Fi,Zi];var Er=class{constructor(){this.cache=new WeakMap,this.currentFrameId=0,this.rafId=null}getPosition(e){let t=this.cache.get(e);if(t?.frameId===this.currentFrameId)return t.rect;this.scheduleFrameUpdate();let i=et(e);return this.cache.set(e,{rect:i,frameId:this.currentFrameId}),i}invalidate(){this.currentFrameId++}scheduleFrameUpdate(){this.rafId||(this.rafId=requestAnimationFrame(()=>{this.currentFrameId++,this.rafId=null}))}};let Ji=-1;function Or(){let e=document.createElement("div");return e.tabIndex=-1,e}var Ki=class extends k{constructor(e,t){super(),this.element=e,this.accessor=t,this.map={},this._disposed=!1,this._generation=0,this.positionCache=new Er,this.addDisposables(M.from(()=>{for(let i of Object.values(this.map))i.disposable.dispose(),i.destroy.dispose(),this.cancelPendingUpdate(i);this._disposed=!0}))}updateAllPositions(){if(!this._disposed){this.positionCache.invalidate();for(let e of Object.values(this.map))e.panel.api.isVisible&&e.resize&&e.resize()}}repositionPanelOverlay(e,t=!1,i){var n;if(this._disposed)return;let o=this.map[e];o&&(o.forceVisible=t,o.clip=i,this.positionCache.invalidate(),(n=o.resize)===null||n===void 0||n.call(o))}cancelPendingUpdate(e){e.pendingUpdate!==void 0&&(cancelAnimationFrame(e.pendingUpdate),e.pendingUpdate=void 0)}detatch(e){if(this.map[e.api.id]){let t=this.map[e.api.id];return t.disposable.dispose(),t.destroy.dispose(),this.cancelPendingUpdate(t),delete this.map[e.api.id],!0}return!1}attach(e){let{panel:t,referenceContainer:i}=e;if(!this.map[t.api.id]){let v=Or();v.className="dv-render-overlay",v.style.visibility="hidden",this.map[t.api.id]={panel:t,disposable:M.NONE,destroy:M.NONE,element:v,retainPreviousGeometry:!1,positioned:!1,generation:++this._generation}}let n=this.map[t.api.id];n.referenceContainer!==i&&(n.generation=++this._generation,this.cancelPendingUpdate(n),n.referenceContainer=i,n.retainPreviousGeometry=n.positioned);let o=n.generation,r=n.element,a=t.view.content.element;a.parentElement!==r&&r.appendChild(a),r.parentElement!==this.element&&this.element.appendChild(r);let s=()=>{let v=t.api.id,p=this.map[v];if(p?.generation!==o||p.pendingUpdate!==void 0)return;p.pendingUpdate=Ji;let u=requestAnimationFrame(()=>{var g;let b=this.map[v];if(b&&(b.pendingUpdate=void 0),this.isDisposed||b?.generation!==o)return;let D=(g=b.forceVisible)!==null&&g!==void 0?g:!1,w=b.clip,_=this.positionCache.getPosition(i.element),S=this.positionCache.getPosition(this.element),T=_.left-S.left,y=_.top-S.top,P=_.width,A=_.height;if(b.retainPreviousGeometry&&(P===0||A===0)){!t.api.isVisible&&!D&&(r.style.visibility="hidden",r.style.pointerEvents="none");return}if(b.retainPreviousGeometry=!1,b.positioned=!0,r.style.left=`${T}px`,r.style.top=`${y}px`,r.style.width=`${P}px`,r.style.height=`${A}px`,t.api.isVisible||D?(r.style.visibility="",r.style.pointerEvents=""):(r.style.visibility="hidden",r.style.pointerEvents="none"),D?r.style.zIndex="1000":t.api.location.type!=="floating"&&(r.style.zIndex=""),w){var O,z;let I=this.element.ownerDocument.defaultView,W=(O=I?.scrollX)!==null&&O!==void 0?O:0,B=(z=I?.scrollY)!==null&&z!==void 0?z:0,R=w.top+B,U=w.left+W,L=Math.max(0,R-_.top),E=Math.max(0,U-_.left),ne=Math.max(0,_.left+P-(w.right+W)),De=Math.max(0,_.top+A-(w.bottom+B));r.style.clipPath=`inset(${L}px ${ne}px ${De}px ${E}px)`}else r.style.clipPath="";x(r,"dv-render-overlay-float",t.group.api.location.type==="floating")});p.pendingUpdate===Ji&&(p.pendingUpdate=u)},d=()=>{if(t.api.isVisible){var v;this.positionCache.invalidate(),s(),!((v=this.map[t.api.id])===null||v===void 0)&&v.retainPreviousGeometry&&(r.style.visibility=""),r.style.pointerEvents=""}else r.style.visibility="hidden",r.style.pointerEvents="none"},l=new H,h=()=>{t.api.location.type==="floating"?queueMicrotask(()=>{let v=this.accessor.getFloatingWindowForGroup(t.api.group);if(!v)return;let p=v.overlay.element,u=()=>{let b=Number(p.getAttribute("aria-level"));r.style.zIndex=`calc(var(--dv-overlay-z-index, 999) + ${b*2+1})`},g=new MutationObserver(()=>{u()});l.value=M.from(()=>g.disconnect()),g.observe(p,{attributeFilter:["aria-level"],attributes:!0}),u()}):r.style.zIndex=""},c=new k(l,new jt(r,{onDragEnd:v=>{i.dropTarget.dnd.onDragEnd(v)},onDragEnter:v=>{i.dropTarget.dnd.onDragEnter(v)},onDragLeave:v=>{i.dropTarget.dnd.onDragLeave(v)},onDrop:v=>{i.dropTarget.dnd.onDrop(v)},onDragOver:v=>{i.dropTarget.dnd.onDragOver(v)}}),t.api.onDidVisibilityChange(()=>{d()}),t.api.onDidDimensionsChange(()=>{t.api.isVisible&&s()}),t.api.onDidLocationChange(()=>{h()}));return this.map[t.api.id].destroy=M.from(()=>{a.parentElement===r&&a.remove(),r.remove()}),h(),queueMicrotask(()=>{this.isDisposed||d()}),this.map[t.api.id].disposable.dispose(),this.map[t.api.id].disposable=c,this.map[t.api.id].resize=s,r}};function ji(e,t,i,n,o,r,a){try{var s=e[r](a),d=s.value}catch(l){i(l);return}s.done?t(d):Promise.resolve(d).then(n,o)}function qi(e){return function(){var t=this,i=arguments;return new Promise(function(n,o){var r=e.apply(t,i);function a(d){ji(r,n,o,a,s,"next",d)}function s(d){ji(r,n,o,a,s,"throw",d)}a(void 0)})}}function Mr(e){let t;try{t=new URL(e,globalThis.location.href)}catch{throw new Error(`dockview: invalid popout URL: ${e}`)}if(!(t.protocol==="http:"||t.protocol==="https:")||t.origin!==globalThis.location.origin)throw new Error(`dockview: popout URL must be same-origin http(s); got: ${e}`)}var Lr=class extends k{get window(){var e,t;return(e=(t=this._window)===null||t===void 0?void 0:t.value)!==null&&e!==void 0?e:null}constructor(e,t,i){super(),this.target=e,this.className=t,this.options=i,this._onWillClose=new m,this.onWillClose=this._onWillClose.event,this._onDidClose=new m,this.onDidClose=this._onDidClose.event,this._window=null,this.addDisposables(this._onWillClose,this._onDidClose,{dispose:()=>{this.close()}})}dimensions(){if(!this._window)return null;let e=this._window.value.screenX;return{top:this._window.value.screenY,left:e,width:this._window.value.innerWidth,height:this._window.value.innerHeight}}close(){if(this._window){var e,t;this._onWillClose.fire(),(e=(t=this.options).onWillClose)===null||e===void 0||e.call(t,{id:this.target,window:this._window.value}),this._window.disposable.dispose(),this._window=null,this._onDidClose.fire()}}open(){var e=this;return qi(function*(){var t,i;if(e._window)throw new Error("instance of popout window is already open");let n=`${e.options.url}`;Mr(n);let o=Object.entries({top:e.options.top,left:e.options.left,width:e.options.width,height:e.options.height}).map(([d,l])=>`${d}=${l}`).join(","),r=window.open(n,e.target,o);if(!r)return null;let a=new k;e._window={value:r,disposable:a},a.addDisposables(M.from(()=>{r.close()}),C(globalThis.window,"beforeunload",()=>{e.close()}));let s=e.createPopoutWindowContainer();return e.className&&s.classList.add(e.className),(t=(i=e.options).onDidOpen)===null||t===void 0||t.call(i,{id:e.target,window:r}),new Promise((d,l)=>{r.addEventListener("unload",()=>{}),a.addDisposables(e.onWillClose(()=>d(null))),r.addEventListener("load",()=>{try{let h=r.document;h.title=document.title,h.body.appendChild(s),yn(h,globalThis.document.styleSheets,{nonce:e.options.nonce}),C(r,"beforeunload",()=>{e.close()}),d(s)}catch(h){l(h)}})})})()}createPopoutWindowContainer(){let e=document.createElement("div");return e.classList.add("dv-popout-window"),e.id="dv-popout-window",e.style.position="absolute",e.style.width="100%",e.style.height="100%",e.style.top="0px",e.style.left="0px",e}},Rr=class extends k{constructor(e){super(),this.accessor=e,this.init()}init(){let e=new Set,t=new Set;this.addDisposables(this.accessor.onDidAddPanel(i=>{if(e.has(i.api.id))throw new Error(`dockview: Invalid event sequence. [onDidAddPanel] called for panel ${i.api.id} but panel already exists`);e.add(i.api.id)}),this.accessor.onDidRemovePanel(i=>{if(e.has(i.api.id))e.delete(i.api.id);else throw new Error(`dockview: Invalid event sequence. [onDidRemovePanel] called for panel ${i.api.id} but panel does not exists`)}),this.accessor.onDidAddGroup(i=>{if(t.has(i.api.id))throw new Error(`dockview: Invalid event sequence. [onDidAddGroup] called for group ${i.api.id} but group already exists`);t.add(i.api.id)}),this.accessor.onDidRemoveGroup(i=>{if(t.has(i.api.id))t.delete(i.api.id);else throw new Error(`dockview: Invalid event sequence. [onDidRemoveGroup] called for group ${i.api.id} but group does not exists`)}))}};function Vr(e){if(!e.matchMedia)return!1;let t=e.matchMedia("(pointer: coarse)").matches,i=e.matchMedia("(pointer: fine)").matches;return t&&!i}function Qi(e){var t,i,n,o,r,a,s;let d=(t=e.window)!==null&&t!==void 0?t:window,l=(i=e.capture)!==null&&i!==void 0?i:!1,h=(n=e.escape)!==null&&n!==void 0?n:!0,c=(o=e.keys)!==null&&o!==void 0?o:[],v=(r=e.outsidePointerDown)!==null&&r!==void 0?r:!0,p=(a=e.pointerDownGraceMs)!==null&&a!==void 0?a:0,u=(s=e.now)!==null&&s!==void 0?s:Date.now,g=u(),b=new k,D=w=>{var _,S;if(e.isInside)return e.isInside(w);let T=w.target;return T instanceof Node?((_=(S=e.elements)===null||S===void 0?void 0:S.call(e))!==null&&_!==void 0?_:[]).some(y=>y.contains(T)):!1};if((h||c.length>0)&&b.addDisposables(C(d,"keydown",w=>{(h&&w.key==="Escape"||c.includes(w.key))&&e.onDismiss()},l)),(v||e.onInsidePointerDown)&&b.addDisposables(C(d,"pointerdown",w=>{if(D(w)){var _;(_=e.onInsidePointerDown)===null||_===void 0||_.call(e,w);return}!v||u()-g<p||e.onDismiss()},l)),e.resize&&b.addDisposables(C(d,"resize",()=>{Vr(d)||e.onDismiss()})),e.focusOut){let w=S=>{var T,y;return e.isFocusInside?e.isFocusInside(S):((T=(y=e.elements)===null||y===void 0?void 0:y.call(e))!==null&&T!==void 0?T:[]).some(P=>P.contains(S))},_=S=>{let T=S.target;T instanceof Element&&!w(T)&&e.onDismiss()};d.addEventListener("focusin",_,l),b.addDisposables({dispose:()=>d.removeEventListener("focusin",_,l)})}return b}var en=class extends k{constructor(e,t=globalThis.window){super(),this._active=null,this._activeDisposable=new H,this._root=e,this._window=t,this._element=t.document.createElement("div"),this._element.className="dv-popover-anchor",this._element.style.position="relative",this._root.prepend(this._element),this.addDisposables(M.from(()=>{this.close()}),this._activeDisposable)}updateRoot(e){e.prepend(this._element),this._root=e}openPopover(e,t){var i;this.close();let n=this._window.document.createElement("div");n.style.position="absolute",n.style.zIndex=(i=t.zIndex)!==null&&i!==void 0?i:"var(--dv-overlay-z-index)",n.appendChild(e);let o=this._element.getBoundingClientRect(),r=o.left,a=o.top;n.style.top=`${t.y-a}px`,n.style.left=`${t.x-r}px`,this._element.appendChild(n),this._active=n;let s=200;this._activeDisposable.value=Qi({window:this._window,onDismiss:()=>this.close(),elements:()=>this._active?[this._active]:[],keys:["Enter"],pointerDownGraceMs:s,resize:!0}),this._window.requestAnimationFrame(()=>{Pn(n,this._root)})}close(){this._active&&(this._active.remove(),this._activeDisposable.dispose(),this._active=null)}},Pt=class extends k{get renderedOutline(){return this._model?this._outline:void 0}get disabled(){return this._disabled}set disabled(e){this.disabled!==e&&(this._disabled=e,e&&this._clearNow())}_cancelPendingClear(){this._pendingClear!==void 0&&(clearTimeout(this._pendingClear),this._pendingClear=void 0)}_clearNow(){this._cancelPendingClear(),this._model&&this._model.root.remove(),this._model=void 0}get model(){if(!this.disabled)return{clear:()=>{this._clearNow()},scheduleClear:()=>{this._pendingClear!==void 0||!this._model||(this._pendingClear=setTimeout(()=>{this._pendingClear=void 0,this._clearNow()},0))},exists:()=>!!this._model,getElements:(e,t)=>{this._cancelPendingClear();let i=this._outline!==t;if(this._outline=t,this._model)return this._model.changed=i,this._model;let n=this.createContainer(),o=this.createAnchor();if(this._model={root:n,overlay:o,changed:i},n.appendChild(o),this.element.appendChild(n),e?.target instanceof HTMLElement){let r=e.target.getBoundingClientRect(),a=this.element.getBoundingClientRect();o.style.left=`${r.left-a.left}px`,o.style.top=`${r.top-a.top}px`}return this._model}}}constructor(e,t){super(),this.element=e,this._disabled=!1,this._disabled=t.disabled,this.addDisposables(M.from(()=>{var i;(i=this.model)===null||i===void 0||i.clear()}))}createContainer(){let e=document.createElement("div");return e.className="dv-drop-target-container",e}createAnchor(){let e=document.createElement("div");return e.className="dv-drop-target-anchor",e.style.visibility="hidden",e}},$r=class{get _effectiveBaseCollapsed(){var e;return(e=this._measuredTabSize)!==null&&e!==void 0?e:this._baseCollapsedSize}get minimumSize(){return this._isCollapsed?this.collapsedSize:this._baseMinimumSize!==void 0?this._baseMinimumSize+this._gapAdd:this._effectiveBaseCollapsed+50+this._gapAdd}get maximumSize(){return this._isCollapsed?this.collapsedSize:this._expandedMaximumSize}get element(){return this._group.element}get isCollapsed(){return this._isCollapsed}get lastExpandedSize(){return this._lastExpandedSize}get collapsedSize(){return this._effectiveBaseCollapsed+this._gapAdd}get configuredMinimumSize(){return this._baseMinimumSize}get configuredMaximumSize(){return this._expandedMaximumSize}get configuredCollapsedSize(){return this._baseCollapsedSize}constructor(e,t,i,n=0){var o,r,a;this._onDidChange=new m,this.onDidChange=this._onDidChange.event,this.snap=!1,this.priority="low",this._isCollapsed=!1,this._tabSizeDisposables=new k,this._group=t,this._orientation=i,t.element.classList.add("dv-edge-group"),t.element.dataset.testid=`dv-edge-group-${e.id}`,this._baseCollapsedSize=(o=e.collapsedSize)!==null&&o!==void 0?o:35,this._baseMinimumSize=e.minimumSize,this._gapAdd=n,this._expandedMaximumSize=(r=e.maximumSize)!==null&&r!==void 0?r:Number.POSITIVE_INFINITY,this._lastExpandedSize=(a=e.initialSize)!==null&&a!==void 0?a:200,e.collapsed&&(this._isCollapsed=!0,t.element.classList.add("dv-edge-collapsed")),this._observeTabStrip()}_observeTabStrip(){let e=this._group.element.querySelector(".dv-tabs-and-actions-container");e&&this._tabSizeDisposables.addDisposables(_e(e,()=>{this._applyMeasuredTabSize(this._orientation==="vertical"?e.offsetHeight:e.offsetWidth)}))}_applyMeasuredTabSize(e){e<=0||e===this._measuredTabSize||(this._measuredTabSize=e,this._isCollapsed&&this._onDidChange.fire({size:this.collapsedSize}))}layout(e,t){this._isCollapsed||(this._lastExpandedSize=e),this._orientation==="horizontal"?this._group.layout(e,t):this._group.layout(t,e)}setCollapsed(e){this._isCollapsed!==e&&(this._isCollapsed=e,this._group.element.classList.toggle("dv-edge-collapsed",e))}setVisible(e){}restoreExpandedSize(e){this._lastExpandedSize=e}updateSizing(e,t,i){this._baseCollapsedSize=e,this._baseMinimumSize=t,this._gapAdd=i}dispose(){this._tabSizeDisposables.dispose(),this._onDidChange.dispose()}},Nr=class{get element(){return this._dockviewElement}constructor(e,t){this._dockviewElement=e,this._layoutDockview=t,this.priority="high",this.minimumSize=100,this.maximumSize=Number.POSITIVE_INFINITY,this._onDidChange=new m,this.onDidChange=this._onDidChange.event}layout(e,t){this._layoutDockview(t,e)}setVisible(e){}dispose(){this._onDidChange.dispose()}},Wr=class{get element(){return this._element}constructor(e,t=0){this._onDidChange=new m,this.onDidChange=this._onDidChange.event,this.minimumSize=100,this.maximumSize=Number.POSITIVE_INFINITY,this.priority="high",this._element=document.createElement("div"),this._element.className="dv-shell-middle-column",this._element.style.height="100%",this._element.style.width="100%",this._splitview=new be(this._element,{orientation:"VERTICAL",proportionalLayout:!1,margin:t}),this._centerIndex=0,this._splitview.addView(e,{type:"distribute"},0)}addTopView(e,t){this._splitview.addView(e,t,0),this._topIndex=0,this._centerIndex+=1,this._bottomIndex!==void 0&&(this._bottomIndex+=1)}addBottomView(e,t){let i=this._splitview.length;this._splitview.addView(e,t,i),this._bottomIndex=i}removeView(e){let t=e==="top"?this._topIndex:this._bottomIndex;t!==void 0&&(this._splitview.removeView(t),e==="top"?(this._topIndex=void 0,this._centerIndex-=1,this._bottomIndex!==void 0&&(this._bottomIndex-=1)):this._bottomIndex=void 0)}layout(e,t){this._splitview.layout(t,e)}setVisible(e){}setViewVisible(e,t){let i=e==="top"?this._topIndex:this._bottomIndex;i!==void 0&&this._splitview.setViewVisible(i,t)}isViewVisible(e){let t=e==="top"?this._topIndex:this._bottomIndex;return t!==void 0?this._splitview.isViewVisible(t):!1}getViewSize(e){let t=e==="top"?this._topIndex:this._bottomIndex;return t!==void 0?this._splitview.getViewSize(t):0}getViewCachedVisibleSize(e){let t=e==="top"?this._topIndex:this._bottomIndex;if(t!==void 0)return this._splitview.getViewCachedVisibleSize(t)}resizeView(e,t){let i=e==="top"?this._topIndex:this._bottomIndex;i!==void 0&&this._splitview.resizeView(i,t)}get axisSize(){return this._splitview.size}updateMargin(e){this._splitview.margin=e}dispose(){this._onDidChange.dispose(),this._splitview.dispose()}},Hr=class{constructor(e,t,i,n=0,o=35){this._disposables=new k,this._viewConfigs=new Map,this._pendingSizes=new Map,this._currentWidth=0,this._currentHeight=0,this._gap=n,this._defaultCollapsedSize=o,this._shellElement=document.createElement("div"),this._shellElement.className="dv-shell",this._shellElement.style.height="100%",this._shellElement.style.width="100%",this._shellElement.style.position="relative",e.appendChild(this._shellElement);let r=new Nr(t,i);this._middleColumn=new Wr(r,n),this._outerSplitview=new be(this._shellElement,{orientation:"HORIZONTAL",proportionalLayout:!1,margin:n}),this._middleIndex=0,this._outerSplitview.addView(this._middleColumn,{type:"distribute"},0),this._disposables.addDisposables(_e(this._shellElement,a=>{if(!this._shellElement.offsetParent||!Wt(this._shellElement))return;let s=Math.round(a.contentRect.width),d=Math.round(a.contentRect.height);s===this._currentWidth&&d===this._currentHeight||(this._currentWidth=s,this._currentHeight=d,this.layout(s,d))}),this._outerSplitview,this._middleColumn,r)}get element(){return this._shellElement}addEdgeView(e,t,i){if(this.hasEdgeGroup(e))throw new Error(`dockview: edge group already registered at position '${e}'`);this._viewConfigs.set(e,t);let n=1+(this._viewConfigs.has("left")?1:0)+(this._viewConfigs.has("right")?1:0),o=1+(this._viewConfigs.has("top")?1:0)+(this._viewConfigs.has("bottom")?1:0),r=n>1?this._gap*(n-1)/n:0,a=o>1?this._gap*(o-1)/o:0,s=e==="left"||e==="right",d=s?r:a,l=s?"horizontal":"vertical",h=new $r(G({collapsedSize:this._defaultCollapsedSize},t),i,l,d),c=h.isCollapsed?h.collapsedSize:h.lastExpandedSize;switch(e){case"left":this._outerSplitview.addView(h,c,0),this._leftIndex=0,this._middleIndex+=1,this._rightIndex!==void 0&&(this._rightIndex+=1),this._leftView=h;break;case"right":{let v=this._outerSplitview.length;this._outerSplitview.addView(h,c,v),this._rightIndex=v,this._rightView=h}break;case"top":this._middleColumn.addTopView(h,c),this._topView=h;break;case"bottom":this._middleColumn.addBottomView(h,c),this._bottomView=h;break}return this._disposables.addDisposables(h),!h.isCollapsed&&!this._canResize(e)&&this._pendingSizes.set(e,c),this.updateTheme(this._gap,this._defaultCollapsedSize),h}layout(e,t){this._outerSplitview.layout(e,t),this._flushPendingSizes()}updateTheme(e,t){var i,n,o,r;this._gap=e,this._defaultCollapsedSize=t;let a=1+(this._viewConfigs.has("left")?1:0)+(this._viewConfigs.has("right")?1:0),s=1+(this._viewConfigs.has("top")?1:0)+(this._viewConfigs.has("bottom")?1:0),d=a>1?e*(a-1)/a:0,l=s>1?e*(s-1)/s:0;this._outerSplitview.margin=e,this._middleColumn.updateMargin(e);let h=(g,b,D)=>{var w;let _=(w=b.collapsedSize)!==null&&w!==void 0?w:t;g.updateSizing(_,b.minimumSize,D)},c=this._viewConfigs.get("top");this._topView&&c&&h(this._topView,c,l);let v=this._viewConfigs.get("bottom");this._bottomView&&v&&h(this._bottomView,v,l);let p=this._viewConfigs.get("left");this._leftView&&p&&h(this._leftView,p,d);let u=this._viewConfigs.get("right");this._rightView&&u&&h(this._rightView,u,d),!((i=this._leftView)===null||i===void 0)&&i.isCollapsed&&this._leftIndex!==void 0&&this._outerSplitview.resizeView(this._leftIndex,this._leftView.collapsedSize),!((n=this._rightView)===null||n===void 0)&&n.isCollapsed&&this._rightIndex!==void 0&&this._outerSplitview.resizeView(this._rightIndex,this._rightView.collapsedSize),!((o=this._topView)===null||o===void 0)&&o.isCollapsed&&this._middleColumn.resizeView("top",this._topView.collapsedSize),!((r=this._bottomView)===null||r===void 0)&&r.isCollapsed&&this._middleColumn.resizeView("bottom",this._bottomView.collapsedSize),this._currentWidth>0&&this._currentHeight>0&&this.layout(this._currentWidth,this._currentHeight)}removeEdgeView(e){let t=this._getView(e);if(t){switch(e){case"left":this._outerSplitview.removeView(this._leftIndex),this._leftIndex=void 0,this._leftView=void 0,this._middleIndex-=1,this._rightIndex!==void 0&&(this._rightIndex-=1);break;case"right":this._outerSplitview.removeView(this._rightIndex),this._rightIndex=void 0,this._rightView=void 0;break;case"top":this._middleColumn.removeView("top"),this._topView=void 0;break;case"bottom":this._middleColumn.removeView("bottom"),this._bottomView=void 0;break}this._disposables.removeDisposable(t),t.dispose(),this._viewConfigs.delete(e),this._pendingSizes.delete(e),this.updateTheme(this._gap,this._defaultCollapsedSize)}}hasEdgeGroup(e){switch(e){case"top":return this._topView!==void 0;case"bottom":return this._bottomView!==void 0;case"left":return this._leftView!==void 0;case"right":return this._rightView!==void 0}}setEdgeGroupVisible(e,t){switch(e){case"left":this._leftIndex!==void 0&&this._outerSplitview.setViewVisible(this._leftIndex,t);break;case"right":this._rightIndex!==void 0&&this._outerSplitview.setViewVisible(this._rightIndex,t);break;case"top":case"bottom":this._middleColumn.setViewVisible(e,t);break}t&&this._flushPendingSizes()}isEdgeGroupVisible(e){switch(e){case"left":return this._leftIndex!==void 0?this._outerSplitview.isViewVisible(this._leftIndex):!1;case"right":return this._rightIndex!==void 0?this._outerSplitview.isViewVisible(this._rightIndex):!1;case"top":case"bottom":return this._middleColumn.isViewVisible(e)}}setEdgeGroupCollapsed(e,t){let i=this._getView(e);i&&(i.setCollapsed(t),t?(this._pendingSizes.delete(e),this._resizeView(e,i.collapsedSize)):this.resizeEdgeGroup(e,i.lastExpandedSize))}resizeEdgeGroup(e,t){let i=this._getView(e);if(!i||!Number.isFinite(t))return;let n=Math.round(t);if(!(n<=0)){if(i.restoreExpandedSize(n),i.isCollapsed){this._pendingSizes.delete(e);return}this._canResize(e)?(this._pendingSizes.delete(e),this._resizeView(e,n)):this._pendingSizes.set(e,n)}}_canResize(e){return this.isEdgeGroupVisible(e)?(e==="left"||e==="right"?this._outerSplitview.size:this._middleColumn.axisSize)>0:!1}_resizeView(e,t){switch(e){case"left":this._leftIndex!==void 0&&this._outerSplitview.resizeView(this._leftIndex,t);break;case"right":this._rightIndex!==void 0&&this._outerSplitview.resizeView(this._rightIndex,t);break;case"top":case"bottom":this._middleColumn.resizeView(e,t);break}}_flushPendingSizes(){if(this._pendingSizes.size!==0)for(let[e,t]of this._pendingSizes){let i=this._getView(e);!i||i.isCollapsed||!this._canResize(e)||(this._pendingSizes.delete(e),this._resizeView(e,t))}}isEdgeGroupCollapsed(e){var t,i;return(t=(i=this._getView(e))===null||i===void 0?void 0:i.isCollapsed)!==null&&t!==void 0?t:!1}getEdgeGroupExpandedSize(e){var t,i;return(t=(i=this._getView(e))===null||i===void 0?void 0:i.lastExpandedSize)!==null&&t!==void 0?t:0}_getView(e){switch(e){case"top":return this._topView;case"bottom":return this._bottomView;case"left":return this._leftView;case"right":return this._rightView}}toJSON(){let e={},t=n=>({minimumSize:n.configuredMinimumSize,maximumSize:Number.isFinite(n.configuredMaximumSize)?n.configuredMaximumSize:void 0,collapsedSize:n.configuredCollapsedSize}),i=(n,o,r,a,s)=>{if(n.isCollapsed)return n.lastExpandedSize;let d=this._pendingSizes.get(o);return d!==void 0?d:r?a:s??n.lastExpandedSize};if(this._leftView&&this._leftIndex!==void 0){let n=this._outerSplitview.isViewVisible(this._leftIndex);e.left=G({size:i(this._leftView,"left",n,this._outerSplitview.getViewSize(this._leftIndex),this._outerSplitview.getViewCachedVisibleSize(this._leftIndex)),visible:n,collapsed:this._leftView.isCollapsed||void 0},t(this._leftView))}if(this._rightView&&this._rightIndex!==void 0){let n=this._outerSplitview.isViewVisible(this._rightIndex);e.right=G({size:i(this._rightView,"right",n,this._outerSplitview.getViewSize(this._rightIndex),this._outerSplitview.getViewCachedVisibleSize(this._rightIndex)),visible:n,collapsed:this._rightView.isCollapsed||void 0},t(this._rightView))}if(this._topView){let n=this._middleColumn.isViewVisible("top");e.top=G({size:i(this._topView,"top",n,this._middleColumn.getViewSize("top"),this._middleColumn.getViewCachedVisibleSize("top")),visible:n,collapsed:this._topView.isCollapsed||void 0},t(this._topView))}if(this._bottomView){let n=this._middleColumn.isViewVisible("bottom");e.bottom=G({size:i(this._bottomView,"bottom",n,this._middleColumn.getViewSize("bottom"),this._middleColumn.getViewCachedVisibleSize("bottom")),visible:n,collapsed:this._bottomView.isCollapsed||void 0},t(this._bottomView))}return e}fromJSON(e){for(let i of["left","right","top","bottom"]){var t;let n=e[i],o=this._getView(i);!n||!o||(o.restoreExpandedSize(n.size),o.setCollapsed((t=n.collapsed)!==null&&t!==void 0?t:!1),n.collapsed?(this._pendingSizes.delete(i),this._resizeView(i,o.collapsedSize)):this.resizeEdgeGroup(i,n.size),this.setEdgeGroupVisible(i,!!n.visible))}}dispose(){this._disposables.dispose(),this._shellElement.remove()}};function Fr(e){var t;return new yt((t=e.tabGroupColors)!==null&&t!==void 0?t:He,e.tabGroupAccent!=="off")}function Je(e){let t=e.from.activePanel;[...e.from.panels].map(i=>{let n=e.from.model.removePanel(i);return e.from.model.renderContainer.detatch(i),n}).forEach(i=>{e.to.model.openPanel(i,{skipSetActive:t!==i,skipSetGroupActive:!0})})}let Tt=()=>({dispose:()=>{}}),Br=Tt;var tn=class extends pt{fireDidCreateTabGroup(e){this._onDidCreateTabGroup.fire(e)}fireDidDestroyTabGroup(e){this._onDidDestroyTabGroup.fire(e)}fireDidAddPanelToTabGroup(e){this._onDidAddPanelToTabGroup.fire(e)}fireDidRemovePanelFromTabGroup(e){this._onDidRemovePanelFromTabGroup.fire(e)}fireDidTabGroupChange(e){this._onDidTabGroupChange.fire(e)}fireDidTabGroupCollapsedChange(e){this._onDidTabGroupCollapsedChange.fire(e)}get orientation(){return this.gridview.orientation}get totalPanels(){return this.panels.length}get panels(){return this.groups.flatMap(e=>e.panels)}get options(){return this._options}get tabGroupColorPalette(){return this._tabGroupColorPalette}get activePanel(){let e=this.activeGroup;if(e)return e.activePanel}get renderer(){var e;return(e=this.options.defaultRenderer)!==null&&e!==void 0?e:"onlyWhenVisible"}get defaultHeaderPosition(){var e;return(e=this.options.defaultHeaderPosition)!==null&&e!==void 0?e:"top"}get api(){return this._api}get floatingGroups(){var e,t;return(e=(t=this._moduleRegistry)===null||t===void 0||(t=t.services.floatingGroupService)===null||t===void 0?void 0:t.floatingGroups)!==null&&e!==void 0?e:[]}getFloatingWindowForGroup(e){var t;return(t=this._floatingGroupService)===null||t===void 0?void 0:t.findByGroup(e)}_gatherFloatingGroupBoxes(e){return this.getFloatingGroupSnapshots(e).map(t=>t.box)}getFloatingContainer(){var e;return(e=this._floatingOverlayHost)!==null&&e!==void 0?e:this.gridview.element}getFloatingGroupSnapshots(e){let t=this.getFloatingContainer().getBoundingClientRect();return this.floatingGroups.filter(i=>i.group!==e).map(i=>{let n=i.overlay.element.getBoundingClientRect();return{group:i.group,box:{left:n.left-t.left,top:n.top-t.top,width:n.width,height:n.height}}})}mergeFloatInto(e,t,i){e===t||!this.getPanel(t.id)||this.moveGroupOrPanel({from:{groupId:e.id},to:{group:t,position:i}})}getGridSplitterRects(){let e=this.getFloatingContainer().getBoundingClientRect(),t=[];return this.gridview.element.querySelectorAll(".dv-sash").forEach(i=>{let n=i.getBoundingClientRect();t.push({left:n.left-e.left,top:n.top-e.top,width:n.width,height:n.height})}),t}get _smartGuidesService(){return this._moduleRegistry.services.smartGuidesService}get smartGuidesEnabled(){var e,t;return(e=(t=this._smartGuidesService)===null||t===void 0?void 0:t.enabled)!==null&&e!==void 0?e:!1}setSmartGuidesEnabled(e){var t;(t=ee(this._smartGuidesService,"SmartGuides","api.setSmartGuidesEnabled"))===null||t===void 0||t.setEnabled(e)}updateSmartGuidesOptions(e){var t;(t=ee(this._smartGuidesService,"SmartGuides","api.updateSmartGuidesOptions"))===null||t===void 0||t.updateOptions(e)}get onDidSnapFloat(){var e,t;return(e=(t=this._smartGuidesService)===null||t===void 0?void 0:t.onDidSnapFloat)!==null&&e!==void 0?e:Tt}get onDidSnapTogether(){var e,t;return(e=(t=this._smartGuidesService)===null||t===void 0?void 0:t.onDidSnapTogether)!==null&&e!==void 0?e:Tt}_buildFloatingDragTransform(e,t){let i=this.options.transformFloatingGroupDrag,n=!t;if(!(!i&&!(n&&this._smartGuidesService)))return o=>{var r,a;let s=i?.({group:e,proposed:o.proposed,container:o.container,others:o.others,modifiers:o.modifiers}),d=s?G(G({},o.proposed),s):o.proposed,l=n?(r=this._smartGuidesService)===null||r===void 0?void 0:r.transformFloatingGroupDrag({group:e,proposed:d,container:o.container,others:o.others,modifiers:o.modifiers}):void 0;return(a=l??s)!==null&&a!==void 0?a:void 0}}get _floatingGroupService(){return this._moduleRegistry.services.floatingGroupService}get _popoutWindowService(){return this._moduleRegistry.services.popoutWindowService}get _watermarkService(){return this._moduleRegistry.services.watermarkService}get _edgeGroupService(){return this._moduleRegistry.services.edgeGroupService}get _rootDropTargetService(){return this._moduleRegistry.services.rootDropTargetService}get _advancedDnDService(){return this._moduleRegistry.services.advancedDnDService}get _dndCompassService(){return this._moduleRegistry.services.dndCompassService}canDropOnGroup(e,t,i){return e.model.canDisplayContentOverlay(i,t)}getDropOverlayElement(e){var t,i;let n=e.element.querySelector(".dv-content-container");if(n)return((t=this.options.theme)===null||t===void 0?void 0:t.dndPanelOverlay)==="group"&&(i=n.parentElement)!==null&&i!==void 0?i:n}getTabsListElement(e){return e.model.header.hidden?void 0:e.model.tabsListElement}relayoutGroup(e){e.relayout()}setForcedOverflow(e,t){e.model.header.setForcedOverflow(t)}getLayoutElement(){return this.gridview.element}getDropPositionResolver(){var e;if(this.options.dropPositionResolver)return this.options.dropPositionResolver;let t=(e=this._dndCompassService)===null||e===void 0?void 0:e.resolver,i=this._moduleRegistry.services.autoEdgeGroupService;return t&&i?{resolve:n=>{var o;return(o=i.resolveEdge(n))!==null&&o!==void 0?o:t.resolve(n)}}:t??i?.resolver}dockToLayoutEdge(e,t){let i=new St({nativeEvent:e,position:t,panel:void 0,api:this._api,group:void 0,getData:$,kind:"edge"});if(this._onWillDrop.fire(i),i.defaultPrevented)return;let n=$();if(n){var o;this.moveGroupOrPanel({from:{groupId:n.groupId,panelId:(o=n.panelId)!==null&&o!==void 0?o:void 0},to:{group:this.orthogonalize(t),position:"center"}})}else this._onDidDrop.fire(new Ue({nativeEvent:e,position:t,panel:void 0,api:this._api,group:void 0,getData:$}))}get headerActionsService(){return this._moduleRegistry.services.headerActionsService}get _layoutHistoryService(){return this._moduleRegistry.services.layoutHistoryService}undo(){var e;(e=ee(this._layoutHistoryService,"LayoutHistory","api.undo"))===null||e===void 0||e.undo()}redo(){var e;(e=ee(this._layoutHistoryService,"LayoutHistory","api.redo"))===null||e===void 0||e.redo()}get canUndo(){var e,t;return(e=(t=this._layoutHistoryService)===null||t===void 0?void 0:t.canUndo)!==null&&e!==void 0?e:!1}get canRedo(){var e,t;return(e=(t=this._layoutHistoryService)===null||t===void 0?void 0:t.canRedo)!==null&&e!==void 0?e:!1}clearHistory(){var e;(e=this._layoutHistoryService)===null||e===void 0||e.clear()}get onDidChangeHistory(){var e,t;return(e=(t=this._layoutHistoryService)===null||t===void 0?void 0:t.onDidChangeHistory)!==null&&e!==void 0?e:Br}get hasEdgeDragReveal(){return!!this._moduleRegistry.services.autoEdgeGroupService}isGridEmpty(){return this.gridview.length===0}rootDropTargetOverrideTarget(){var e;return(e=this.rootDropTargetContainer)===null||e===void 0?void 0:e.model}dispatchUnhandledDragOver(e,t){let i=new xt(e,"edge",t,$);return this._onUnhandledDragOver.fire(i),i.isAccepted}fireWillDragPanel(e){this._onWillDragPanel.fire(e)}fireWillDragGroup(e){this._onWillDragGroup.fire(e)}fireWillDrop(e){this._onWillDrop.fire(e)}fireWillShowOverlay(e){this._onWillShowOverlay.fire(e)}buildGroupDragGhost(e){var t;return(t=this._advancedDnDService)===null||t===void 0?void 0:t.buildGroupDragGhost(e)}resolveDropOverlayModel(e,t){var i;return(i=this._advancedDnDService)===null||i===void 0?void 0:i.resolveOverlayModel(e,t)}get rootElement(){var e,t;return(e=(t=this._shellManager)===null||t===void 0?void 0:t.element)!==null&&e!==void 0?e:this.element}ownsElement(e){if(this.rootElement.contains(e))return!0;let t=this.rootElement.ownerDocument,i=e.ownerDocument;return!i||i===t?!1:this.getPopoutWindows().some(n=>n.document===i)}adjacentGroup(e,t){var i;if(e.api.location.type!=="grid")return;let n=V(e.element);return(i=t?this.gridview.previous(n):this.gridview.next(n))===null||i===void 0?void 0:i.view}adjacentGroupInDirection(e,t){if(e.api.location.type!=="grid")return;let i=e.element.getBoundingClientRect(),n=i.left+i.width/2,o=i.top+i.height/2,r,a=Number.POSITIVE_INFINITY;for(let s of this.groups){if(s===e||s.api.location.type!=="grid")continue;let d=s.element.getBoundingClientRect(),l=d.left+d.width/2-n,h=d.top+d.height/2-o,c;switch(t){case"left":c=l<0&&Math.abs(l)>=Math.abs(h);break;case"right":c=l>0&&Math.abs(l)>=Math.abs(h);break;case"up":c=h<0&&Math.abs(h)>=Math.abs(l);break;default:c=h>0&&Math.abs(h)>=Math.abs(l);break}if(!c)continue;let v=l*l+h*h;v<a&&(a=v,r=s)}return r}showDropPreview(e,t){var i,n;return(i=(n=this._advancedDnDService)===null||n===void 0?void 0:n.showPreviewOverlay(e,t))!==null&&i!==void 0?i:M.NONE}announce(e){var t;(t=this._moduleRegistry.services.liveRegionService)===null||t===void 0||t.announce(e)}dockPanel(e,t,i){this.moveGroupOrPanel({from:{groupId:e.group.id,panelId:e.id},to:{group:t,position:i}})}floatPanel(e){this.addFloatingGroup(e)}get contextMenuService(){return this._moduleRegistry.services.contextMenuService}get pinnedTabsService(){return this._moduleRegistry.services.pinnedTabsService}get advancedOverflowService(){return this._moduleRegistry.services.advancedOverflowService}setPanelPinned(e,t){var i;e.isPinned!==t&&!((i=this.options.pinnedTabs)===null||i===void 0)&&i.enabled&&this.pinnedTabsService&&(e.setPinned(t),this._onDidPanelPinnedChange.fire({panel:e,isPinned:t}))}get mountElement(){return this.gridview.element}hasVisibleGridGroup(){return this.groups.some(e=>e.api.location.type==="grid"&&e.api.isVisible)}fireLayoutChange(){this._bufferOnDidLayoutChange.fire()}get popoutRestorationPromise(){var e,t;return(e=(t=this._popoutWindowService)===null||t===void 0?void 0:t.restorationPromise)!==null&&e!==void 0?e:Promise.resolve()}constructor(e,t){var i,n,o,r,a;super(e,{proportionalLayout:!0,orientation:"HORIZONTAL",styles:t.hideBorders?{separatorBorder:"transparent"}:void 0,disableAutoResizing:t.disableAutoResizing,locked:t.locked,margin:(i=(n=t.theme)===null||n===void 0?void 0:n.gap)!==null&&i!==void 0?i:0,className:t.className}),this.nextGroupId=rt(),this._deserializer=new Ti(this),this._moduleRegistry=new rr,this._onWillDragPanel=new m,this.onWillDragPanel=this._onWillDragPanel.event,this._onWillDragGroup=new m,this.onWillDragGroup=this._onWillDragGroup.event,this._onDidDrop=new m,this.onDidDrop=this._onDidDrop.event,this._onWillDrop=new m,this.onWillDrop=this._onWillDrop.event,this._mutationDepth=0,this._pendingLocationChanges=new Map,this._origin="user",this._originDepth=0,this._onWillMutateLayout=new m,this.onWillMutateLayout=this._onWillMutateLayout.event,this._onDidMutateLayout=new m,this.onDidMutateLayout=this._onDidMutateLayout.event,this._onWillShowOverlay=new m,this.onWillShowOverlay=this._onWillShowOverlay.event,this._onUnhandledDragOver=new m,this.onUnhandledDragOver=this._onUnhandledDragOver.event,this._onDidRemovePanel=new m,this.onDidRemovePanel=this._onDidRemovePanel.event,this._onDidAddPanel=new m,this.onDidAddPanel=this._onDidAddPanel.event,this._onDidPopoutGroupSizeChange=new m,this.onDidPopoutGroupSizeChange=this._onDidPopoutGroupSizeChange.event,this._onDidPopoutGroupPositionChange=new m,this.onDidPopoutGroupPositionChange=this._onDidPopoutGroupPositionChange.event,this._onDidAddPopoutGroup=new m,this.onDidAddPopoutGroup=this._onDidAddPopoutGroup.event,this._onDidRemovePopoutGroup=new m,this.onDidRemovePopoutGroup=this._onDidRemovePopoutGroup.event,this._onDidChangePopouts=new m,this.onDidChangePopouts=this._onDidChangePopouts.event,this._onDidOpenPopoutWindowFail=new m,this.onDidOpenPopoutWindowFail=this._onDidOpenPopoutWindowFail.event,this._onDidStartFloatingGroupDrag=new m,this.onDidStartFloatingGroupDrag=this._onDidStartFloatingGroupDrag.event,this._onDidEndFloatingGroupDrag=new m,this.onDidEndFloatingGroupDrag=this._onDidEndFloatingGroupDrag.event,this._onDidLayoutFromJSON=new m,this.onDidLayoutFromJSON=this._onDidLayoutFromJSON.event,this._onDidActivePanelChange=new m({replay:!0}),this.onDidActivePanelChange=this._onDidActivePanelChange.event,this._onDidPanelPinnedChange=new m,this.onDidPanelPinnedChange=this._onDidPanelPinnedChange.event,this._onDidMovePanel=new m,this.onDidMovePanel=this._onDidMovePanel.event,this._onDidCreateTabGroup=new m,this.onDidCreateTabGroup=this._onDidCreateTabGroup.event,this._onDidDestroyTabGroup=new m,this.onDidDestroyTabGroup=this._onDidDestroyTabGroup.event,this._onDidAddPanelToTabGroup=new m,this.onDidAddPanelToTabGroup=this._onDidAddPanelToTabGroup.event,this._onDidRemovePanelFromTabGroup=new m,this.onDidRemovePanelFromTabGroup=this._onDidRemovePanelFromTabGroup.event,this._onDidTabGroupChange=new m,this.onDidTabGroupChange=this._onDidTabGroupChange.event,this._onDidTabGroupCollapsedChange=new m,this.onDidTabGroupCollapsedChange=this._onDidTabGroupCollapsedChange.event,this._onDidMaximizedGroupChange=new m,this.onDidMaximizedGroupChange=this._onDidMaximizedGroupChange.event,this._inShellLayout=!1,this._onDidRemoveGroup=new m,this.onDidRemoveGroup=this._onDidRemoveGroup.event,this._onDidEdgeGroupAutoHideChange=new m,this.onDidEdgeGroupAutoHideChange=this._onDidEdgeGroupAutoHideChange.event,this._onDidAddGroup=new m,this.onDidAddGroup=this._onDidAddGroup.event,this._onDidOptionsChange=new m,this.onDidOptionsChange=this._onDidOptionsChange.event,this._onDidActiveGroupChange=new m,this.onDidActiveGroupChange=this._onDidActiveGroupChange.event,this._peekingGroups=new Set,this._moving=!1,this._options=t,this._tabGroupColorPalette=Fr(t);let s=t.modules,d=s??[...Ar,...Oi()];for(let c of d)this._moduleRegistry.register(c);this._moduleRegistry.initialize(this),this.reportMissingOptionModules(t);let l=this._popoutWindowService;l&&this.addDisposables(l.onDidRemove(c=>{this._onDidRemovePopoutGroup.fire({id:c.popoutGroup.id,group:c.popoutGroup,window:c.getWindow()})})),this.popupService=new en(this.element),this._api=new Ve(this),this.disableResizing=!0,this.element.remove(),this._shellManager=new Hr(e,this.element,(c,v)=>this._layoutFromShell(c,v),(o=(r=t.theme)===null||r===void 0?void 0:r.gap)!==null&&o!==void 0?o:0,(a=t.theme)===null||a===void 0?void 0:a.edgeGroupCollapsedSize),this.popupService.updateRoot(this._shellManager.element),this._shellThemeClassnames=new Oe(this._shellManager.element),this.rootDropTargetContainer=new Pt(this._shellManager.element,{disabled:!0}),this.floatingDropTargetContainer=new Pt(this._shellManager.element,{disabled:!1}),this.overlayRenderContainer=new Ki(this._shellManager.element,this),this._floatingOverlayHost=document.createElement("div"),this._floatingOverlayHost.className="dv-floating-overlay-host",this._shellManager.element.appendChild(this._floatingOverlayHost),x(this.gridview.element,"dv-dockview",!0),x(this.element,"dv-debug",!!t.debug),this.updateTheme(),t.debug&&this.addDisposables(new Rr(this)),this.addDisposables(M.from(()=>this._pendingLocationChanges.clear()),this.rootDropTargetContainer,this.floatingDropTargetContainer,C(this._shellManager.element,"dragend",()=>{var c,v;(c=this.rootDropTargetContainer.model)===null||c===void 0||c.clear(),(v=this.floatingDropTargetContainer.model)===null||v===void 0||v.clear()},!0),this.overlayRenderContainer,this._onWillDragPanel,this._onWillDragGroup,this._onWillShowOverlay,this._onDidActivePanelChange,this._onDidPanelPinnedChange,this._onDidAddPanel,this._onDidRemovePanel,this._onDidLayoutFromJSON,this._onDidDrop,this._onWillDrop,this._onWillMutateLayout,this._onDidMutateLayout,this._onDidMovePanel,this._onDidMovePanel.event(()=>{this.debouncedUpdateAllPositions()}),this._onDidAddGroup,this._onDidRemoveGroup,this._onDidEdgeGroupAutoHideChange,this._onDidActiveGroupChange,this._onUnhandledDragOver,this._onDidMaximizedGroupChange,this._onDidPopoutGroupSizeChange,this._onDidPopoutGroupPositionChange,this._onDidAddPopoutGroup,this._onDidRemovePopoutGroup,this._onDidChangePopouts,this._onDidAddPopoutGroup.event(()=>this._onDidChangePopouts.fire()),this._onDidRemovePopoutGroup.event(()=>this._onDidChangePopouts.fire()),this._onDidOpenPopoutWindowFail,this._onDidStartFloatingGroupDrag,this._onDidEndFloatingGroupDrag,this._onDidCreateTabGroup,this._onDidDestroyTabGroup,this._onDidAddPanelToTabGroup,this._onDidRemovePanelFromTabGroup,this._onDidTabGroupChange,this._onDidTabGroupCollapsedChange,q.any(this.onDidPopoutGroupSizeChange,this.onDidPopoutGroupPositionChange,this.onDidCreateTabGroup,this.onDidDestroyTabGroup,this.onDidAddPanelToTabGroup,this.onDidRemovePanelFromTabGroup,this.onDidTabGroupChange,this.onDidTabGroupCollapsedChange)(()=>{this.fireLayoutChange()}),this._onDidOptionsChange,this.onDidAdd(c=>{this._moving||this._onDidAddGroup.fire(c)}),this.onDidRemove(c=>{this._moving||this._onDidRemoveGroup.fire(c)}),this.onDidActiveChange(c=>{this._moving||this._onDidActiveGroupChange.fire(c)}),this.onDidMaximizedChange(c=>{this._onDidMaximizedGroupChange.fire({group:c.panel,isMaximized:c.isMaximized})}),q.any(this.onDidAddPanel,this.onDidRemovePanel,this.onDidAddGroup,this.onDidRemove,this.onDidRemoveGroup,this.onDidMovePanel,this.onDidActivePanelChange)(()=>{this._bufferOnDidLayoutChange.fire()}),M.from(()=>{var c;this._moduleRegistry.dispose(),(c=this._shellManager)===null||c===void 0||c.dispose()}));let h=this._rootDropTargetService;h&&this.addDisposables(h.onWillShowOverlay(c=>{this.gridview.length>0&&c.position==="center"||this._onWillShowOverlay.fire(new ke(c,{kind:"edge",panel:void 0,api:this._api,group:void 0,getData:$}))}),h.onDrop(c=>this.dockToLayoutEdge(c.nativeEvent,c.position))),this._moduleRegistry.postConstruct(this)}setVisible(e,t){switch(e.api.location.type){case"grid":super.setVisible(e,t);break;case"floating":{let i=this.floatingGroups.find(n=>n.group===e);i&&(i.overlay.setVisible(t),e.api._onDidVisibilityChange.fire({isVisible:t}));break}case"popout":console.warn("dockview: You cannot hide a group that is in a popout window");break;case"edge":break}}getPopupServiceForGroup(e){var t,i;return(t=(i=this._popoutWindowService)===null||i===void 0||(i=i.findByGroup(e))===null||i===void 0?void 0:i.popupService)!==null&&t!==void 0?t:this.popupService}addPopoutGroup(e,t){return this.mutationAsync("popout",()=>this._doAddPopoutGroup(e,t))}getPopouts(){var e,t;return(e=(t=this._popoutWindowService)===null||t===void 0?void 0:t.entries.map(i=>({id:i.popoutGroup.id,group:i.popoutGroup,window:i.getWindow()})))!==null&&e!==void 0?e:[]}getPopoutWindows(){return this.getPopouts().map(e=>e.window)}_doAddPopoutGroup(e,t){var i,n,o,r,a;let s=ee(this._popoutWindowService,"PopoutWindow","api.addPopoutGroup");if(!s||e instanceof Te&&e.model.location.type==="edge")return Promise.resolve(!1);if(e instanceof we&&e.group.size===1)return this.addPopoutGroup(e.group,t);let d=kn(this.gridview.element),l=this.element;function h(){var b,D;if(t?.position)return t.position;let w=(e instanceof Te?e.element:(b=(D=e.group)===null||D===void 0?void 0:D.element)!==null&&b!==void 0?b:l).getBoundingClientRect();return{left:window.screenX+w.left,top:window.screenY+w.top,width:w.width,height:w.height}}let c=h(),v=(i=t==null||(n=t.overridePopoutGroup)===null||n===void 0?void 0:n.id)!==null&&i!==void 0?i:this.getNextGroupId(),p=(o=t?.popoutUrl)!==null&&o!==void 0?o:(r=this.options)===null||r===void 0?void 0:r.popoutUrl,u=new Lr(`${this.id}-${v}`,d??"",{url:p??"/popout.html",left:c.left,top:c.top,width:c.width,height:c.height,onDidOpen:t?.onDidOpen,onWillClose:t?.onWillClose,nonce:(a=this.options)===null||a===void 0?void 0:a.nonce}),g=new k(u,u.onDidClose(()=>{g.dispose()}));return u.open().then(b=>{var D,w;if(u.isDisposed)return!1;let _=(D=t?.referenceGroup)!==null&&D!==void 0?D:e instanceof we?e.group:e,S=e.api.location.type,T=_.element.parentElement!==null,y;if(t?.overridePopoutGridview){var P;y=(P=t.overridePopoutGroup)!==null&&P!==void 0?P:_}else T?t?.overridePopoutGroup?y=t.overridePopoutGroup:(y=this.createGroup({id:v}),b&&this._onDidAddGroup.fire(y)):y=_;if(b===null)return this.handleBlockedPopout({group:y,referenceGroup:_,options:t,popoutWindowDisposable:g}),!1;let A=document.createElement("div");A.className="dv-overlay-render-container";let O=new Ki(A,this);y.model.renderContainer=O;let z=(w=t?.overridePopoutGridview)!==null&&w!==void 0?w:this.createNestedGridview();t?.overridePopoutGridview||z.addView(y,X.Distribute,[0]),z.element.style.width="100%",z.element.style.height="100%",z.layout(u.window.innerWidth,u.window.innerHeight);let I=!1,W=()=>{I||(I=!0,z.dispose())},B,R=[];if(!t?.overridePopoutGroup&&!t?.overridePopoutGridview&&T)if(e instanceof we){let K=e.group;this.movingLock(()=>{let j=_.model.removePanel(e);y.model.openPanel(j)}),R=[{panel:e,from:K}]}else switch(this.movingLock(()=>Je({from:_,to:y})),R=y.panels.map(K=>({panel:K,from:_})),S){case"grid":_.api.setVisible(!1);break;case"floating":case"popout":var U;B=(U=this.floatingGroups.find(K=>K.group.api.id===e.api.id))===null||U===void 0?void 0:U.overlay.toJSON(),this.removeGroup(_);break}b.classList.add("dv-dockview"),b.style.overflow="hidden",b.appendChild(A),b.appendChild(z.element);let L=document.createElement("div"),E=new Pt(L,{disabled:this.rootDropTargetContainer.disabled});b.appendChild(L),y.model.dropTargetContainer=E;let ne=new en(b,u.window);if(g.addDisposables(ne),y.model.location={type:"popout",getWindow:()=>u.window,popoutUrl:p},t?.overridePopoutGridview){let K=this.groups.filter(j=>z.element.contains(j.element));for(let j of K)j.model.renderContainer=O,j.model.dropTargetContainer=E,j.model.location={type:"popout",getWindow:()=>u.window,popoutUrl:p}}T&&e.api.location.type==="grid"&&e.api.setVisible(!1),this.doSetGroupAndPanelActive(y);let De=s.observeGridviewSize(u,z,O);De&&g.addDisposables(De);let Ke=new H;g.addDisposables(Ke);let hn=K=>{Ke.value=new k(K.api.onDidActiveChange(j=>{if(j.isActive){var At;(At=u.window)===null||At===void 0||At.focus()}}),K.api.onWillFocus(()=>{var j;(j=u.window)===null||j===void 0||j.focus()}))};hn(y);let cn={},jr=T&&_&&this.getPanel(_.id),xe={window:u,popoutGroup:y,gridview:z,overlayRenderContainer:O,dropTargetContainer:E,getWindow:()=>u.window,popoutUrl:p,referenceGroup:jr?_.id:void 0,popupService:ne,setAnchorGroup:K=>{xe.popoutGroup=K,hn(K)},disposable:{dispose:()=>(g.dispose(),cn.returnedGroup)}},vn=Gn(u.window);g.addDisposables(vn,zn(u.window,()=>{this._onDidPopoutGroupSizeChange.fire({width:u.window.innerWidth,height:u.window.innerHeight,group:xe.popoutGroup})}),vn.event(()=>{this._onDidPopoutGroupPositionChange.fire({screenX:u.window.screenX,screenY:u.window.screenY,group:xe.popoutGroup})}),C(u.window,"resize",()=>{z.layout(u.window.innerWidth,u.window.innerHeight)}),O,M.from(()=>this.disposePopoutWindow({group:y,referenceGroup:_,popoutGridview:z,isGroupAddedToDom:T,floatingBox:B,disposePopoutGridview:W,closeResult:cn}))),s.add(xe),this._onDidAddPopoutGroup.fire({id:xe.popoutGroup.id,group:xe.popoutGroup,window:xe.getWindow()});for(let{panel:K,from:j}of R)this.fireDidMovePanel(K,j);return!0}).catch(b=>(console.error("dockview: failed to create popout.",b),!1))}handleBlockedPopout(e){let{group:t,referenceGroup:i,options:n,popoutWindowDisposable:o}=e;if(console.error("dockview: failed to create popout. perhaps you need to allow pop-ups for this website"),o.dispose(),this._onDidOpenPopoutWindowFail.fire(),n?.overridePopoutGridview){let r=n.overridePopoutGridview,a=this.groups.filter(s=>r.element.contains(s.element));for(let s of a)this.movingLock(()=>{r.remove(s),this.redockGroupToMainGrid(s)});r.dispose(),i&&!i.api.isVisible&&i.api.setVisible(!0);return}t===i?this.gridview.element.contains(t.element)||(this.movingLock(()=>this.doAddGroup(t,[0])),t.model.location={type:"grid"}):(this.movingLock(()=>Je({from:t,to:i})),t.model.size===0&&this._groups.has(t.id)&&(t.dispose(),this._groups.delete(t.id),this._onDidRemoveGroup.fire(t))),i.api.isVisible||i.api.setVisible(!0)}redockGroupToMainGrid(e){e.model.renderContainer=this.overlayRenderContainer,e.model.dropTargetContainer=this.rootDropTargetContainer,e.model.location={type:"grid"},this.doAddGroup(e,[0])}disposePopoutWindow(e){var t;let{group:i,referenceGroup:n,popoutGridview:o,isGroupAddedToDom:r,floatingBox:a,disposePopoutGridview:s,closeResult:d}=e;if(this.isDisposed){s();return}let l=!!(!((t=this._popoutWindowService)===null||t===void 0)&&t.entries.find(u=>u.gridview===o)),h=this.groups.filter(u=>o.element.contains(u.element)),c=h.includes(i),v=c&&h.length===1,p=[];if(l){for(let u of h)if(u!==i){this.movingLock(()=>{this.doRemoveGroup(u,{skipDispose:!0,skipActive:!0,skipPopoutReturn:!0}),this.redockGroupToMainGrid(u)});for(let g of u.panels)p.push({panel:g,from:u})}}if(c&&r&&this.getPanel(n.id)){let u=[...i.panels];this.movingLock(()=>Je({from:i,to:n}));for(let g of u)p.push({panel:g,from:i});n.api.isVisible||n.api.setVisible(!0),this.getPanel(i.id)&&this.doRemoveGroup(i,{skipPopoutAssociated:!0})}else if(c&&this.getPanel(i.id)){if(i.model.renderContainer=this.overlayRenderContainer,i.model.dropTargetContainer=this.rootDropTargetContainer,d.returnedGroup=i,!l){s();return}if(a&&v)this.addFloatingGroup(i,{height:a.height,width:a.width,position:a});else{this.doRemoveGroup(i,{skipDispose:!0,skipActive:!0,skipPopoutReturn:!0}),i.model.location={type:"grid"},this.movingLock(()=>{this.doAddGroup(i,[0])});for(let u of i.panels)p.push({panel:u,from:i})}this.doSetGroupAndPanelActive(i)}s();for(let{panel:u,from:g}of p)this.fireDidMovePanel(u,g)}addFloatingGroup(e,t){this.mutation("float",()=>this._doAddFloatingGroup(e,t))}_doAddFloatingGroup(e,t){if(!ee(this._floatingGroupService,"FloatingGroup","api.addFloatingGroup")||e instanceof Te&&e.model.location.type==="edge")return;let i,n=[];if(e instanceof we){let d=e.group;i=this.createGroup(),this._onDidAddGroup.fire(i),this.movingLock(()=>this.removePanel(e,{removeEmptyGroup:!1,skipDispose:!0,skipSetActiveGroup:!0})),this.removeGroupIfEmpty(d),this.movingLock(()=>i.model.openPanel(e,{skipSetGroupActive:!0})),n=[{panel:e,from:d}]}else{var o;i=e;let d=(o=this._popoutWindowService)===null||o===void 0?void 0:o.findReferenceGroupId(i),l=d?this.getPanel(d):void 0;typeof t?.skipRemoveGroup=="boolean"&&t.skipRemoveGroup||(l?(this.movingLock(()=>Je({from:e,to:l})),this.doRemoveGroup(e,{skipPopoutReturn:!0,skipPopoutAssociated:!0}),this.doRemoveGroup(l,{skipDispose:!0}),i=l,n=i.panels.map(h=>({panel:h,from:e}))):(this.doRemoveGroup(e,{skipDispose:!0,skipPopoutReturn:!0,skipPopoutAssociated:!1}),n=i.panels.map(h=>({panel:h,from:i}))))}function r(){if(t?.position){let d={};return"left"in t.position?d.left=Math.max(t.position.left,0):"right"in t.position?d.right=Math.max(t.position.right,0):d.left=fe.left,"top"in t.position?d.top=Math.max(t.position.top,0):"bottom"in t.position?d.bottom=Math.max(t.position.bottom,0):d.top=fe.top,typeof t.width=="number"?d.width=Math.max(t.width,0):d.width=fe.width,typeof t.height=="number"?d.height=Math.max(t.height,0):d.height=fe.height,d}return{left:typeof t?.x=="number"?Math.max(t.x,0):fe.left,top:typeof t?.y=="number"?Math.max(t.y,0):fe.top,width:typeof t?.width=="number"?Math.max(t.width,0):fe.width,height:typeof t?.height=="number"?Math.max(t.height,0):fe.height}}let a=r(),s=this.createNestedGridview();s.addView(i,X.Distribute,[0]),this.mountFloatingWindow(s,i,[i],a,{dragHandle:t?.dragHandle,inDragMode:t?.inDragMode,skipActiveGroup:t?.skipActiveGroup,disableSmartGuides:t?.disableSmartGuides});for(let{panel:d,from:l}of n)this.fireDidMovePanel(d,l)}removeGroupIfEmpty(e){e.model.size===0&&this.doRemoveGroup(e,{skipActive:!0})}createNestedGridview(e="HORIZONTAL"){var t,i;return new ct(!0,this.options.hideBorders?{separatorBorder:"transparent"}:void 0,e,!1,(t=(i=this.options.theme)===null||i===void 0?void 0:i.gap)!==null&&t!==void 0?t:0)}mountFloatingWindow(e,t,i,n,o){var r,a,s,d,l,h,c,v,p;let u=ee(this._floatingGroupService,"FloatingGroup","api.addFloatingGroup");if(!u)return;let g=((r=(a=o?.dragHandle)!==null&&a!==void 0?a:this.options.floatingGroupDragHandle)!==null&&r!==void 0?r:"titlebar")==="titlebar"?new nr(this,t):void 0,b=new zt(G(G({container:(s=this._floatingOverlayHost)!==null&&s!==void 0?s:this.gridview.element,content:e.element,header:g?.element},n),{},{minimumInViewportWidth:this.options.floatingGroupBounds==="boundedWithinViewport"?void 0:(d=(l=this.options.floatingGroupBounds)===null||l===void 0?void 0:l.minimumWidthWithinViewport)!==null&&d!==void 0?d:100,minimumInViewportHeight:this.options.floatingGroupBounds==="boundedWithinViewport"?void 0:(h=(c=this.options.floatingGroupBounds)===null||c===void 0?void 0:c.minimumHeightWithinViewport)!==null&&h!==void 0?h:100,transformDragPosition:this._buildFloatingDragTransform(t,(v=o?.disableSmartGuides)!==null&&v!==void 0?v:!1),getSiblingBoxes:()=>this._gatherFloatingGroupBoxes(t)})),D=(p=g?.element)!==null&&p!==void 0?p:t.element.querySelector(".dv-void-container");if(!D)throw new Error("dockview: failed to find drag handle");b.setupDrag(D,{inDragMode:typeof o?.inDragMode=="boolean"?o.inDragMode:!1});let w=u.add(t,b,e);w.addDisposables(b.onDidStartMoving(()=>this._onDidStartFloatingGroupDrag.fire(t)),b.onDidChangeEnd(()=>this._onDidEndFloatingGroupDrag.fire(t))),g&&(w.setTitleBar(g),w.addDisposables(g,M.from(()=>w.setTitleBar(void 0)),g.onDragStart(_=>{this._onWillDragGroup.fire({nativeEvent:_,group:w.group})})));for(let _ of i)_.model.location={type:"floating"};o?.skipActiveGroup||this.doSetGroupAndPanelActive(t)}orthogonalize(e,t){switch(this.gridview.normalize(),e){case"top":case"bottom":this.gridview.orientation==="HORIZONTAL"&&this.gridview.insertOrthogonalSplitviewAtRoot();break;case"left":case"right":this.gridview.orientation==="VERTICAL"&&this.gridview.insertOrthogonalSplitviewAtRoot();break;default:break}switch(e){case"top":case"left":case"center":return this.createGroupAtLocation([0],void 0,t);case"bottom":case"right":return this.createGroupAtLocation([this.gridview.length],void 0,t);default:throw new Error(`dockview: unsupported position ${e}`)}}updateOptions(e){var t,i;super.updateOptions(e),this.reportMissingOptionModules(e),(t=this._floatingGroupService)===null||t===void 0||t.updateBounds(e),(i=this._rootDropTargetService)===null||i===void 0||i.setOptions(e);let n=this.options.disableDnd,o=this.options.dndStrategy;this._options=G(G({},this.options),e);let r=this.options.disableDnd,a=this.options.dndStrategy;if((n!==r||o!==a)&&this.updateDragAndDropState(),"theme"in e&&this.updateTheme(),"createRightHeaderActionComponent"in e||"createLeftHeaderActionComponent"in e||"createPrefixHeaderActionComponent"in e){var s;(s=this.headerActionsService)===null||s===void 0||s.refreshAll()}if("createWatermarkComponent"in e){var d;(d=this._watermarkService)===null||d===void 0||d.refresh();for(let h of this.groups)h.model.refreshWatermark()}if("tabGroupColors"in e||"tabGroupAccent"in e){var l;this._tabGroupColorPalette.setEntries((l=this._options.tabGroupColors)!==null&&l!==void 0?l:He),this._tabGroupColorPalette.enabled=this._options.tabGroupAccent!=="off";for(let h of this.groups)h.model.refreshTabGroupAccent()}this._onDidOptionsChange.fire(),this._layoutFromShell(this.gridview.width,this.gridview.height)}reportMissingOptionModules(e){lr(e,t=>this._moduleRegistry.has(t))}layout(e,t,i){var n;this._shellManager&&!this._inShellLayout?this._shellManager.layout(e,t):super.layout(e,t,i),this._syncFloatingOverlayHost(),(n=this._moduleRegistry)===null||n===void 0||(n=n.services.floatingGroupService)===null||n===void 0||n.constrainBounds()}_syncFloatingOverlayHost(){if(!this._floatingOverlayHost||!this._shellManager)return;let e=this._shellManager.element.getBoundingClientRect(),t=this.element.getBoundingClientRect(),i=this._floatingOverlayHost;i.style.left=`${t.left-e.left}px`,i.style.top=`${t.top-e.top}px`,i.style.width=`${t.width}px`,i.style.height=`${t.height}px`}_layoutFromShell(e,t){this._inShellLayout=!0,this.layout(e,t,!0),this._inShellLayout=!1}forceRelayout(){this._shellManager?this._layoutFromShell(this.width,this.height):super.forceRelayout()}addEdgeGroup(e,t){let i=this._edgeGroupService;if(!i)throw new Error(Ai("EdgeGroup","api.addEdgeGroup"));if(i.has(e))throw new Error(`dockview: edge group already exists at position '${e}'`);return this.mutation("add",()=>{let n=this.createGroup({id:t.id});n.model.location={type:"edge",position:e},n.model.headerPosition=e;let o=n.onDidChange(a=>{var s;if(!a)return;let d=e==="left"||e==="right"?a.width:a.height;typeof d=="number"&&((s=this._shellManager)===null||s===void 0||s.resizeEdgeGroup(e,d))}),r=n.model.onDidRemovePanel(()=>{n.model.isEmpty&&(i.isAutoReveal(n)?queueMicrotask(()=>{var a;n.model.isEmpty&&(!((a=this._edgeGroupService)===null||a===void 0)&&a.includes(n))&&this.removeEdgeGroup(e)}):this.setEdgeGroupCollapsed(n,!0))});return i.add(e,n,new k(r,o)),t.autoHide!==void 0&&i.setAutoHide(n,t.autoHide),t.autoReveal!==void 0&&i.setAutoReveal(n,t.autoReveal),this._onDidAddGroup.fire(n),this._shellManager.addEdgeView(e,t,n),n.api})}revealEdgeGroupWithData(e,t,i){let n=this._edgeGroupService;n&&this.mutation("add",()=>{var o;let r=n.get(e);r||(this.addEdgeGroup(e,{id:this.getNextGroupId(),autoReveal:!0,autoHide:i?.autoHide,collapsed:!0}),r=n.get(e)),r&&this.moveGroupOrPanel({from:{groupId:t.groupId,panelId:(o=t.panelId)!==null&&o!==void 0?o:void 0},to:{group:r,position:"center"}})})}getEdgeGroup(e){var t;return(t=this._edgeGroupService)===null||t===void 0||(t=t.get(e))===null||t===void 0?void 0:t.api}getEdgeGroupPanel(e){var t;return(t=this._edgeGroupService)===null||t===void 0?void 0:t.get(e)}pinEdgeGroup(e){var t;(t=ee(this._moduleRegistry.services.autoHideEdgeGroupService,"AutoHideEdgeGroup","api.pinEdgeGroup"))===null||t===void 0||t.pin(e)}autoHideEdgeGroup(e){var t;(t=ee(this._moduleRegistry.services.autoHideEdgeGroupService,"AutoHideEdgeGroup","api.autoHideEdgeGroup"))===null||t===void 0||t.autoHide(e)}peekEdgeGroup(e,t){var i;(i=ee(this._moduleRegistry.services.autoHideEdgeGroupService,"AutoHideEdgeGroup","api.peekEdgeGroup"))===null||i===void 0||i.peek(e,t)}get overlayRoot(){return this.rootElement}getDropZoneRect(){return this.element.getBoundingClientRect()}getEdgeGroupExpandedSize(e){var t,i;return(t=(i=this._shellManager)===null||i===void 0?void 0:i.getEdgeGroupExpandedSize(e))!==null&&t!==void 0?t:0}repositionPanelOverlay(e,t,i){this.overlayRenderContainer.repositionPanelOverlay(e.api.id,t,i)}setEdgeGroupVisible(e,t){this._shellManager.setEdgeGroupVisible(e,t)}isEdgeGroupVisible(e){return this._shellManager.isEdgeGroupVisible(e)}removeEdgeGroup(e){let t=ee(this._edgeGroupService,"EdgeGroup","api.removeEdgeGroup");if(!t)return;let i=t.get(e);if(!i)throw new Error(`dockview: no edge group exists at position '${e}'`);this.mutation("remove",()=>{for(let n of[...i.panels])this.removePanel(n,{removeEmptyGroup:!1,skipDispose:!1});this._shellManager.removeEdgeView(e),t.remove(e),i.dispose(),this._groups.delete(i.id),this._onDidRemoveGroup.fire(i)})}setEdgeGroupCollapsed(e,t){var i;let n=(i=this._edgeGroupService)===null||i===void 0?void 0:i.findPositionOf(e);n&&this._shellManager.isEdgeGroupCollapsed(n)!==t&&(this._shellManager.setEdgeGroupCollapsed(n,t),e.api._onDidCollapsedChange.fire({isCollapsed:t}))}isEdgeGroupCollapsed(e){var t;let i=(t=this._edgeGroupService)===null||t===void 0?void 0:t.findPositionOf(e);return i?this._shellManager.isEdgeGroupCollapsed(i):!1}isEdgeGroupPeeking(e){return this._peekingGroups.has(e)}setEdgeGroupPeeking(e,t){this._peekingGroups.has(e)!==t&&(t?this._peekingGroups.add(e):this._peekingGroups.delete(e),e.api._onDidPeekChange.fire({isPeeking:t}))}isEdgeGroupAutoHide(e){var t,i;let n=(t=this._edgeGroupService)===null||t===void 0?void 0:t.isAutoHide(e);if(n!==void 0)return n;let o=(i=this._edgeGroupService)===null||i===void 0?void 0:i.findPositionOf(e);return o===void 0?!1:bi(this.options.autoHideEdgeGroups,o)}setEdgeGroupAutoHide(e,t){let i=this._edgeGroupService;i?.includes(e)&&(i.setAutoHide(e,t),this._onDidEdgeGroupAutoHideChange.fire(e))}updateDragAndDropState(){for(let e of this.groups)e.model.updateDragAndDropState()}focus(){var e;(e=this.activeGroup)===null||e===void 0||e.focus()}getGroupPanel(e){return this.panels.find(t=>t.id===e)}setActivePanel(e){e.group.model.openPanel(e),this.doSetGroupAndPanelActive(e.group)}activateNext(e={}){var t;if(!e.group){if(!this.activeGroup)return;e.group=this.activeGroup}if(e.includePanel&&e.group&&e.group.activePanel!==e.group.panels[e.group.panels.length-1]){e.group.model.moveToNext({suppressRoll:!0});return}let i=V(e.group.element),n=(t=this.gridview.next(i))===null||t===void 0?void 0:t.view;this.doSetGroupAndPanelActive(n)}activatePrevious(e={}){var t;if(!e.group){if(!this.activeGroup)return;e.group=this.activeGroup}if(e.includePanel&&e.group&&e.group.activePanel!==e.group.panels[0]){e.group.model.moveToPrevious({suppressRoll:!0});return}let i=V(e.group.element),n=(t=this.gridview.previous(i))===null||t===void 0?void 0:t.view;n&&this.doSetGroupAndPanelActive(n)}toJSON(){var e,t,i,n,o;let r=this.gridview.serialize(),a=this.panels.reduce((c,v)=>(c[v.id]=v.toJSON(),c),{}),s=(e=(t=this._floatingGroupService)===null||t===void 0?void 0:t.serialize())!==null&&e!==void 0?e:[],d=(i=(n=this._popoutWindowService)===null||n===void 0?void 0:n.serialize())!==null&&i!==void 0?i:[],l={grid:r,panels:a,activeGroup:(o=this.activeGroup)===null||o===void 0?void 0:o.id};s.length>0&&(l.floatingGroups=s),d.length>0&&(l.popoutGroups=d);let h=this._serializeEdgeGroups();return h&&(l.edgeGroups=h),l}_serializeEdgeGroups(){var e;if(!(!((e=this._edgeGroupService)===null||e===void 0)&&e.hasAny()))return;let t=this._shellManager.toJSON();for(let[i,n]of this._edgeGroupService.entries()){let o=t[i];if(!o)continue;if(this._edgeGroupService.isAutoReveal(n)&&n.model.isEmpty){delete t[i];continue}o.group=n.toJSON(),this._edgeGroupService.isAutoReveal(n)&&(o.autoReveal=!0);let r=this._edgeGroupService.isAutoHide(n);r!==void 0&&(o.autoHide=r)}return t}fromJSON(e,t){this.mutation("load",()=>this._doFromJSON(e,t))}_doFromJSON(e,t){var i,n;if((i=this._popoutWindowService)===null||i===void 0||i.cancelPendingRestorations(),typeof e!="object"||e===null)throw new Error("dockview: serialized layout must be a non-null object");if(!e.grid||((n=e.grid.root)===null||n===void 0?void 0:n.type)!=="branch"||!Array.isArray(e.grid.root.data))throw new Error("dockview: root must be of type branch");let o=new Map,r=new Map,a=[],s=[],d=()=>{for(let _ of s)try{_.dispose()}catch(S){console.error("dockview: failed to dispose a temporary group created for reuseExistingPanels",S)}s.length=0};if(t?.reuseExistingPanels){let _=Object.keys(e.panels),S,T=()=>{let y=this.createGroup(),P=this._groups.get(y.api.id);return this._groups.delete(y.api.id),s.push(M.from(()=>{this.movingLock(()=>{for(let A of y.panels.slice())y.model.removePanel(A)}),P?.disposable.dispose(),y.dispose()})),y};try{for(let y of this.panels)if(_.includes(y.api.id)){o.set(y.api.id,y);let P;if(y.api.renderer==="always"&&y.api.isVisible)P=T();else{var l;(l=S)!==null&&l!==void 0||(S=T()),P=S}r.set(y.api.id,P),a.push({panel:y,temporaryGroup:P})}this.movingLock(()=>{a.forEach(({panel:y,temporaryGroup:P})=>{this.moveGroupOrPanel({from:{groupId:y.api.group.api.id,panelId:y.api.id},to:{group:P,position:"center"},keepEmptyGroups:!0})})}),this.clear()}catch(y){throw d(),y}}else this.clear();let{grid:h,panels:c,activeGroup:v}=e;try{var p,u,g,b,D;let _=this.width,S=this.height,T=P=>{let{id:A,locked:O,hideHeader:z,headerPosition:I,views:W,activeView:B}=P;if(typeof A!="string")throw new TypeError("dockview: group id must be of type string");let R=this.createGroup({id:A,locked:!!O,hideHeader:!!z,headerPosition:I});this._onDidAddGroup.fire(R);let U=[],L=W.filter(E=>c[E]);for(let E of L){let ne=o.get(E),De=r.get(E);if(De&&ne)this.movingLock(()=>{De.model.removePanel(ne)}),U.push(ne),ne.updateFromStateModel(c[E]);else{let Ke=this._deserializer.fromJSON(c[E],R);U.push(Ke)}}for(let E of U){let ne=typeof B=="string"&&B===E.id;o.has(E.api.id)?this.movingLock(()=>{R.model.openPanel(E,{skipSetActive:!ne,skipSetGroupActive:!0})}):R.model.openPanel(E,{skipSetActive:!ne,skipSetGroupActive:!0})}return P.tabGroups&&P.tabGroups.length>0&&R.model.restoreTabGroups(P.tabGroups),!R.activePanel&&R.panels.length>0&&R.model.openPanel(R.panels[R.panels.length-1],{skipSetGroupActive:!0}),R};this.gridview.deserialize(h,{fromJSON:P=>T(P.data)}),this._layoutFromShell(_,S),e.edgeGroups&&this.deserializeEdgeGroups(e.edgeGroups,c,o,r),this.deserializeFloatingWindows((p=e.floatingGroups)!==null&&p!==void 0?p:[],T);let y=this.deserializePopoutWindows((u=e.popoutGroups)!==null&&u!==void 0?u:[],T);if((g=this._popoutWindowService)===null||g===void 0||g.finishRestoration(y),(b=this._floatingGroupService)===null||b===void 0||b.constrainBounds(),typeof v=="string"){let P=this.getPanel(v);P&&this.doSetGroupAndPanelActive(P)}(D=this._watermarkService)===null||D===void 0||D.update()}catch(_){var w;console.error("dockview: failed to deserialize layout. Reverting changes",_);for(let S of this.groups)for(let T of S.panels)this.removePanel(T,{removeEmptyGroup:!1,skipDispose:!1});for(let S of this.groups)S.dispose(),this._groups.delete(S.id),this._onDidRemoveGroup.fire(S);throw(w=this._floatingGroupService)===null||w===void 0||w.disposeAll(),this.clear(),_}finally{d()}this.debouncedUpdateAllPositions(),this._onDidLayoutFromJSON.fire()}deserializeNestedGridview(e,t){let i=this.createNestedGridview(e.orientation),n=[];return i.deserialize(e,{fromJSON:o=>{let r=t(o.data);return n.push(r),r}}),{gridview:i,members:n}}deserializeEdgeGroups(e,t,i,n){let o=ee(this._edgeGroupService,"EdgeGroup","fromJSON edge restoration");if(o){for(let a of["top","bottom","left","right"]){let s=e[a];if(s&&!o.has(a)){var r;let d=s.group,l=(r=d?.id)!==null&&r!==void 0?r:`${a}-group`;this.addEdgeGroup(a,{id:l,autoReveal:s.autoReveal,autoHide:s.autoHide,minimumSize:s.minimumSize,maximumSize:s.maximumSize,collapsedSize:s.collapsedSize})}}for(let[a,s]of o.entries()){let d=e[a],l=d?.group;if(l){let{views:h,activeView:c}=l,v=[];for(let p of h){if(!t[p])continue;let u=i.get(p),g=n.get(p);if(g&&u)this.movingLock(()=>{g.model.removePanel(u)}),v.push(u),u.updateFromStateModel(t[p]);else{let b=this._deserializer.fromJSON(t[p],s);v.push(b)}}for(let p of v){let u=c===p.id;i.has(p.api.id)?this.movingLock(()=>{s.model.openPanel(p,{skipSetActive:!u,skipSetGroupActive:!0})}):s.model.openPanel(p,{skipSetActive:!u,skipSetGroupActive:!0})}l.tabGroups&&l.tabGroups.length>0&&s.model.restoreTabGroups(l.tabGroups),!s.activePanel&&s.panels.length>0&&s.model.openPanel(s.panels[s.panels.length-1],{skipSetGroupActive:!0})}}this._shellManager.fromJSON(e)}}deserializeFloatingWindows(e,t){for(let i of e){let{data:n,grid:o,position:r}=i;if(o){let{gridview:a,members:s}=this.deserializeNestedGridview(o,t);if(s.length===0)continue;this.mountFloatingWindow(a,s[0],s,r,{inDragMode:!1})}else if(n){let a=t(n);this.addFloatingGroup(a,{position:r,width:r.width,height:r.height,skipRemoveGroup:!0,inDragMode:!1})}}}deserializePopoutWindows(e,t){let i=e.length>0?ee(this._popoutWindowService,"PopoutWindow","fromJSON popout restoration"):this._popoutWindowService;return i?e.flatMap((n,o)=>{let{data:r,grid:a,position:s,gridReferenceGroup:d,url:l}=n,h,c=[];if(a){let p=this.deserializeNestedGridview(a,t);if(h=p.gridview,c=p.members,c.length===0)return h.dispose(),[]}let v=a?c[0]:t(r);return i.scheduleRestoration(o*100,()=>{this.addPopoutGroup(v,{position:s??void 0,overridePopoutGroup:d?v:void 0,overridePopoutGridview:h,referenceGroup:d?this.getPanel(d):void 0,popoutUrl:l})},()=>{for(let p of c.length>0?c:[v])if(!this.isDisposed&&this._groups.has(p.id)&&p.element.parentElement===null){for(let u of[...p.panels])this.removePanel(u,{removeEmptyGroup:!1});p.dispose(),this._groups.delete(p.id),this._onDidRemoveGroup.fire(p)}})}):[]}clear(){this.mutation("clear",()=>this._doClear())}_doClear(){let e=Array.from(this._groups.values()).map(n=>n.value),t=!!this.activeGroup;for(let n of e){var i;if(!((i=this._edgeGroupService)===null||i===void 0)&&i.includes(n)){let o=[...n.panels];for(let r of o)this.removePanel(r,{removeEmptyGroup:!1});continue}this.removeGroup(n,{skipActive:!0})}t&&this.doSetGroupAndPanelActive(void 0),this.gridview.clear()}closeAllGroups(){this.mutation("remove",()=>{for(let e of this._groups.entries()){let[t,i]=e;i.value.model.closeAllPanels()}})}addPanel(e){return this.mutation("add",()=>this._doAddPanel(e))}_doAddPanel(e){if(this.panels.some(h=>h.id===e.id))throw new Error(`dockview: panel with id ${e.id} already exists`);let t;if(e.position&&e.floating)throw new Error("dockview: you can only provide one of: position, floating as arguments to .addPanel(...)");let i={width:e.initialWidth,height:e.initialHeight},n,o=h=>!!e.inactive&&h.model.size>0;if(e.position)if(fi(e.position)){let h=typeof e.position.referencePanel=="string"?this.getGroupPanel(e.position.referencePanel):e.position.referencePanel;if(n=e.position.index,!h){var r;let c=typeof e.position.referencePanel=="string"?e.position.referencePanel:(r=e.position.referencePanel)===null||r===void 0?void 0:r.id;throw new Error(`dockview: referencePanel '${c}' does not exist`)}t=this.findGroup(h)}else if(_i(e.position)){var a;if(t=typeof e.position.referenceGroup=="string"?(a=this._groups.get(e.position.referenceGroup))===null||a===void 0?void 0:a.value:e.position.referenceGroup,n=e.position.index,!t){var s;let h=typeof e.position.referenceGroup=="string"?e.position.referenceGroup:(s=e.position.referenceGroup)===null||s===void 0?void 0:s.id;throw new Error(`dockview: referenceGroup '${h}' does not exist`)}}else{let h=this.orthogonalize(mt(e.position.direction)),c=this.createPanel(e,h);return h.model.openPanel(c,{skipSetActive:o(h),skipSetGroupActive:e.inactive,index:n}),e.inactive||this.doSetGroupAndPanelActive(h),h.api.setSize({height:i?.height,width:i?.width}),c}else t=this.activeGroup;let d;if(t){var l;let h=ze(((l=e.position)===null||l===void 0?void 0:l.direction)||"within");if(e.floating){let c=this.createGroup();this._onDidAddGroup.fire(c);let v=typeof e.floating=="object"&&e.floating!==null?e.floating:{};this.addFloatingGroup(c,G(G({},v),{},{inDragMode:!1,skipRemoveGroup:!0,skipActiveGroup:!0})),d=this.createPanel(e,c),c.model.openPanel(d,{skipSetActive:o(c),skipSetGroupActive:e.inactive,index:n})}else if(t.api.location.type==="floating"||t.api.location.type==="edge"||h==="center")d=this.createPanel(e,t),t.model.openPanel(d,{skipSetActive:o(t),skipSetGroupActive:e.inactive,index:n}),t.api.setSize({width:i?.width,height:i?.height}),e.inactive||this.doSetGroupAndPanelActive(t);else{let c=V(t.element),v=Q(this.gridview.orientation,c,h),p=this.createGroupAtLocation(v,this.orientationAtLocation(v)==="VERTICAL"?i?.height:i?.width);d=this.createPanel(e,p),p.model.openPanel(d,{skipSetActive:o(p),skipSetGroupActive:e.inactive,index:n}),e.inactive||this.doSetGroupAndPanelActive(p)}}else if(e.floating){let h=this.createGroup();this._onDidAddGroup.fire(h);let c=typeof e.floating=="object"&&e.floating!==null?e.floating:{};this.addFloatingGroup(h,G(G({},c),{},{inDragMode:!1,skipRemoveGroup:!0,skipActiveGroup:!0})),d=this.createPanel(e,h),h.model.openPanel(d,{skipSetActive:o(h),skipSetGroupActive:e.inactive,index:n})}else{let h=this.createGroupAtLocation([0],this.gridview.orientation==="VERTICAL"?i?.height:i?.width);d=this.createPanel(e,h),h.model.openPanel(d,{skipSetActive:o(h),skipSetGroupActive:e.inactive,index:n}),e.inactive||this.doSetGroupAndPanelActive(h)}return d}removePanel(e,t){this.mutation("remove",()=>{var i;return this._doRemovePanel(e,{removeEmptyGroup:(i=t?.removeEmptyGroup)!==null&&i!==void 0?i:!0,skipDispose:t?.skipDispose,skipSetActiveGroup:t?.skipSetActiveGroup})})}_doRemovePanel(e,t){let i=e.group;if(!i)throw new Error(`dockview: cannot remove panel ${e.id}. it's missing a group.`);i.model.removePanel(e,{skipSetActiveGroup:t.skipSetActiveGroup}),t.skipDispose||(e.group.model.renderContainer.detatch(e),e.dispose()),i.size===0&&t.removeEmptyGroup&&this.removeGroup(i,{skipActive:t.skipSetActiveGroup})}createWatermarkComponent(){return this.options.createWatermarkComponent?this.options.createWatermarkComponent():new tr}addGroup(e){return this.mutation("add",()=>this._doAddGroup(e))}_doAddGroup(e){if(e){let o;if(wi(e)){var t;let h=typeof e.referencePanel=="string"?this.panels.find(v=>v.id===e.referencePanel):e.referencePanel,c=typeof e.referencePanel=="string"?e.referencePanel:(t=e.referencePanel)===null||t===void 0?void 0:t.id;if(!h)throw new Error(`dockview: reference panel ${c} does not exist`);if(o=this.findGroup(h),!o)throw new Error(`dockview: reference group for reference panel ${c} does not exist`)}else if(Di(e)){var i;if(o=typeof e.referenceGroup=="string"?(i=this._groups.get(e.referenceGroup))===null||i===void 0?void 0:i.value:e.referenceGroup,!o){var n;let h=typeof e.referenceGroup=="string"?e.referenceGroup:(n=e.referenceGroup)===null||n===void 0?void 0:n.id;throw new Error(`dockview: reference group ${h} does not exist`)}}else{let h=this.orthogonalize(mt(e.direction),e);return e.skipSetActive||this.doSetGroupAndPanelActive(h),h}let r=ze(e.direction||"within"),a=V(o.element),s=Q(this.gridview.orientation,a,r),d=this.createGroup(e),l=this.getLocationOrientation(s)==="VERTICAL"?e.initialHeight:e.initialWidth;return this.doAddGroup(d,s,l),e.skipSetActive||this.doSetGroupAndPanelActive(d),d}else{let o=this.createGroup(e);return this.doAddGroup(o),this.doSetGroupAndPanelActive(o),o}}getLocationOrientation(e){return e.length%2==0&&this.gridview.orientation==="HORIZONTAL"?"HORIZONTAL":"VERTICAL"}removeGroup(e,t){this.mutation("remove",()=>this.doRemoveGroup(e,t))}detachFromNestedWindow(e){var t,i;let n=(t=this._floatingGroupService)===null||t===void 0?void 0:t.findByGroup(e);if(n){let r=this.nestedWindowMembers(e);return r.length<=1?!1:(n.gridview.remove(e),n.group===e&&n.setAnchorGroup(r.find(a=>a!==e)),!0)}let o=(i=this._popoutWindowService)===null||i===void 0?void 0:i.findByGroup(e);if(o){let r=this.nestedWindowMembers(e);return r.length<=1?!1:(o.gridview.remove(e),o.popoutGroup===e&&o.setAnchorGroup(r.find(a=>a!==e)),!0)}return!1}disposeGroupRecord(e){e.dispose(),this._groups.delete(e.id),this._onDidRemoveGroup.fire(e)}activateFallbackGroupIfRemoved(e,t){if(!t&&this._activeGroup===e){let i=Array.from(this._groups.values());this.doSetGroupAndPanelActive(i.length>0?i[0].value:void 0)}}doRemoveGroup(e,t){var i;if(!((i=this._edgeGroupService)===null||i===void 0)&&i.includes(e))return e;let n=[...e.panels];if(!t?.skipDispose)for(let h of n){var o;this.removePanel(h,{removeEmptyGroup:!1,skipDispose:(o=t?.skipDispose)!==null&&o!==void 0?o:!1})}let r=this.activePanel;if(e.api.location.type==="floating"){var a;let h=(a=this._floatingGroupService)===null||a===void 0?void 0:a.findByGroup(e);if(!h)throw new Error("dockview: failed to find floating group");return this.detachFromNestedWindow(e)?(t?.skipDispose?e.model.location={type:"grid"}:this.disposeGroupRecord(e),this.activateFallbackGroupIfRemoved(e,t?.skipActive),e):(t?.skipDispose||this.disposeGroupRecord(e),h.dispose(),this.activateFallbackGroupIfRemoved(e,t?.skipActive),e)}if(e.api.location.type==="popout"){var s,d;let h=(s=this._popoutWindowService)===null||s===void 0?void 0:s.findByGroup(e);if(!h)throw new Error("dockview: failed to find popout group");if(this.detachFromNestedWindow(e))return t?.skipDispose?e.model.location={type:"grid"}:this.disposeGroupRecord(e),this.activateFallbackGroupIfRemoved(e,t?.skipActive),e;if(!t?.skipDispose){if(!t?.skipPopoutAssociated){let v=h.referenceGroup?this.getPanel(h.referenceGroup):void 0;v?.panels.length===0&&this.removeGroup(v)}h.popoutGroup.dispose(),this._groups.delete(e.id),this._onDidRemoveGroup.fire(e)}(d=this._popoutWindowService)===null||d===void 0||d.remove(h);let c=h.disposable.dispose();return!t?.skipPopoutReturn&&c&&(this.doAddGroup(c,[0]),this.doSetGroupAndPanelActive(c)),this.activateFallbackGroupIfRemoved(e,t?.skipActive),h.popoutGroup}if(!this.gridview.element.contains(e.element)){if(!t?.skipDispose){let h=this._groups.get(e.id);h?.disposable.dispose(),this.disposeGroupRecord(e)}return this.activateFallbackGroupIfRemoved(e,t?.skipActive),e}let l=super.doRemoveGroup(e,t);return t?.skipActive||this.activePanel!==r&&this.fireActivePanelChange(this.activePanel),l}debouncedUpdateAllPositions(){this._updatePositionsFrameId!==void 0&&cancelAnimationFrame(this._updatePositionsFrameId),this._updatePositionsFrameId=requestAnimationFrame(()=>{var e,t;this._updatePositionsFrameId=void 0,this.overlayRenderContainer.updateAllPositions();for(let i of(e=(t=this._popoutWindowService)===null||t===void 0?void 0:t.entries)!==null&&e!==void 0?e:[])i.overlayRenderContainer.updateAllPositions()})}movingLock(e){let t=this._moving;try{return this._moving=!0,e()}finally{this._moving=t}}mutation(e,t){let i=this.openMutation(e);try{return t()}finally{i()}}mutationAsync(e,t){var i=this;return qi(function*(){let n=i.openMutation(e);try{return yield t()}finally{n()}})()}openMutation(e){let t=this._origin;return this._mutationDepth===0&&this._onWillMutateLayout.fire({kind:e,origin:t}),this._mutationDepth++,()=>{this._mutationDepth--,this._mutationDepth===0&&(this.flushLocationChanges(),this._onDidMutateLayout.fire({kind:e,origin:t}))}}deferLocationChange(e,t){if(this._mutationDepth===0){t();return}this._pendingLocationChanges.set(e,t)}flushLocationChanges(){if(this._pendingLocationChanges.size===0)return;let e=Array.from(this._pendingLocationChanges.values());this._pendingLocationChanges.clear();for(let t of e)t()}currentOrigin(){return this._origin}withOrigin(e,t){if(this._originDepth>0||this._mutationDepth>0)return t();let i=this._origin;this._origin=e,this._originDepth++;try{return t()}finally{this._originDepth--,this._origin=i}}fireActivePanelChange(e){this._onDidActivePanelChange.fire({panel:e,origin:this._origin})}fireDidMovePanel(e,t){this._onDidMovePanel.fire({panel:e,from:t,to:e.group})}moveGroupOrPanel(e){this.mutation("move",()=>this._doMoveGroupOrPanel(e))}_doMoveGroupOrPanel(e){var t;let i=e.to.group,n=e.from.groupId,o=e.from.panelId,r=e.to.position,a=e.to.index,s=n?(t=this._groups.get(n))===null||t===void 0?void 0:t.value:void 0;if(!s)throw new Error(`dockview: Failed to find group id ${n}`);if(o===void 0){e.from.tabGroupId?this.moveTabGroupToGroup({sourceGroup:s,tabGroupId:e.from.tabGroupId,destinationGroup:i,destinationTarget:r,destinationIndex:a,skipSetActive:e.skipSetActive,keepEmptyGroups:e.keepEmptyGroups}):this.moveGroup({from:{group:s},to:{group:i,position:r},skipSetActive:e.skipSetActive});return}if(!r||r==="center"){let l=this.movingLock(()=>s.model.removePanel(o,{skipSetActive:!1,skipSetActiveGroup:!0}));if(!l)throw new Error(`dockview: No panel with id ${o}`);!e.keepEmptyGroups&&s.model.size===0&&this.doRemoveGroup(s,{skipActive:!0});let h=i.model.size===0;this.movingLock(()=>{var c;return i.model.openPanel(l,{index:a,skipSetActive:((c=e.skipSetActive)!==null&&c!==void 0?c:!1)&&!h,skipSetGroupActive:!0})}),e.skipSetActive||this.doSetGroupAndPanelActive(i),this.fireDidMovePanel(l,s)}else{let l=this.getGridviewForGroup(i),h=V(i.element),c=Q(l.orientation,h,r);if(s.size<2){let[v,p]=ae(c);if(s.api.location.type==="grid"&&l===this.gridview){let[D,w]=ae(V(s.element));if(nt(D,v)){this.gridview.moveView(D,w,p),this.fireDidMovePanel(this.getGroupPanel(o),s);return}}if(s.api.location.type==="popout"&&this.nestedWindowMembers(s).length<=1){var d;let D=(d=this._popoutWindowService)===null||d===void 0?void 0:d.findByGroup(s);if(!D)return;let w=this.movingLock(()=>D.popoutGroup.model.removePanel(D.popoutGroup.panels[0],{skipSetActive:!0,skipSetActiveGroup:!0}));this.doRemoveGroup(s,{skipActive:!0});let _=Q(l.orientation,V(i.element),r),S=this.createGroupAtLocation(_,this.dropSizing(V(i.element)),void 0,l);this.movingLock(()=>S.model.openPanel(w,{skipSetActive:!0})),this.doSetGroupAndPanelActive(S),this.fireDidMovePanel(this.getGroupPanel(o),s);return}if(s.api.location.type==="edge"){let D=this.movingLock(()=>s.model.removePanel(o,{skipSetActive:!1,skipSetActiveGroup:!0}));if(!D)throw new Error(`dockview: No panel with id ${o}`);let w=this.createGroupAtLocation(c,this.dropSizing(h),void 0,l);this.movingLock(()=>w.model.openPanel(D,{skipSetGroupActive:!0})),this.doSetGroupAndPanelActive(w),this.fireDidMovePanel(D,s);return}let u=this.movingLock(()=>this.doRemoveGroup(s,{skipActive:!0,skipDispose:!0})),g=V(i.element),b=Q(l.orientation,g,r);this.movingLock(()=>this.doAddGroup(u,b,this.dropSizing(g),l)),this.setGroupLocationForRoot(u,l),this.doSetGroupAndPanelActive(u),this.fireDidMovePanel(this.getGroupPanel(o),s)}else{let v=this.movingLock(()=>s.model.removePanel(o,{skipSetActive:!1,skipSetActiveGroup:!0}));if(!v)throw new Error(`dockview: No panel with id ${o}`);let p=Q(l.orientation,h,r),u=this.createGroupAtLocation(p,this.dropSizing(h),void 0,l);this.movingLock(()=>u.model.openPanel(v,{skipSetGroupActive:!0})),this.doSetGroupAndPanelActive(u),this.fireDidMovePanel(v,s)}}}moveTabGroupToGroup(e){let{sourceGroup:t,tabGroupId:i,destinationGroup:n,destinationTarget:o,destinationIndex:r}=e,a=t.model.getTabGroups().find(b=>b.id===i);if(!a||a.panelIds.length===0)return;let s=a.label,d=a.color,l=a.collapsed,h=a.componentParams,c=[...a.panelIds],v=o&&o!=="center"?V(n.element):void 0,p=this.movingLock(()=>c.map(b=>t.model.removePanel(b,{skipSetActive:!1,skipSetActiveGroup:!0})).filter(b=>b!==void 0));if(p.length===0)return;let u=b=>{this.movingLock(()=>{for(let w of p)b.model.openPanel(w,{index:r,skipSetActive:!0,skipSetGroupActive:!0})});let D=b.model.createTabGroup({label:s,color:d,collapsed:l,componentParams:h});for(let w of p)b.model.addPanelToTabGroup(D.id,w.id);e.skipSetActive||this.doSetGroupAndPanelActive(b);for(let w of p)this.fireDidMovePanel(w,t)},g;if(!o||o==="center"||!v)g=n;else{let b=Q(this.gridview.orientation,v,o);g=this.createGroupAtLocation(b,this.dropSizing(v))}!e.keepEmptyGroups&&t.model.size===0&&t!==g&&this.doRemoveGroup(t,{skipActive:!0}),u(g)}moveGroup(e){this.mutation("move",()=>this._doMoveGroup(e))}maximizeGroup(e){this.mutation("maximize",()=>super.maximizeGroup(e))}exitMaximizedGroup(){this.mutation("maximize",()=>super.exitMaximizedGroup())}_doMoveGroup(e){var t;let i=e.from.group,n=e.to.group,o=e.to.position,r=i,a;if(o==="center"){let c=i.activePanel,v=i.model.getTabGroups().map(u=>({label:u.label,color:u.color,collapsed:u.collapsed,componentParams:u.componentParams,panelIds:[...u.panelIds]})),p=this.movingLock(()=>[...i.panels].map(u=>i.model.removePanel(u.id,{skipSetActive:!0})));i?.model.size===0&&this.doRemoveGroup(i,{skipActive:!0}),this.movingLock(()=>{for(let u of p)n.model.openPanel(u,{skipSetActive:u!==c,skipSetGroupActive:!0})}),a=p;for(let u of v){let g=n.model.createTabGroup({label:u.label,color:u.color,collapsed:u.collapsed,componentParams:u.componentParams});for(let b of u.panelIds)n.model.addPanelToTabGroup(g.id,b)}e.skipSetActive!==!0?this.doSetGroupAndPanelActive(n):this.activePanel||this.doSetGroupAndPanelActive(n)}else{let c=(()=>{if(i.api.location.type==="edge"||n.api.location.type==="edge")return!1;let v=this.getGridviewForGroup(i);if(v!==this.getGridviewForGroup(n))return!1;let p,u;try{p=V(i.element),u=V(n.element)}catch{return!1}return p.length===0||u.length===0?!1:nt(ae(p)[0],ae(u)[0])&&lt(v.orientation,u)===Le(o)})();if(i.api.location.type==="edge"){let v=i.activePanel,p=i.model.getTabGroups().map(g=>({label:g.label,color:g.color,collapsed:g.collapsed,componentParams:g.componentParams,panelIds:[...g.panelIds]})),u=this.movingLock(()=>[...i.panels].map(g=>i.model.removePanel(g.id,{skipSetActive:!0})));r=this.createGroup(),this._onDidAddGroup.fire(r),this.movingLock(()=>{for(let g of u)r.model.openPanel(g,{skipSetActive:g!==v,skipSetGroupActive:!0})});for(let g of p){let b=r.model.createTabGroup({label:g.label,color:g.color,collapsed:g.collapsed,componentParams:g.componentParams});for(let D of g.panelIds)r.model.addPanelToTabGroup(b.id,D)}}else switch(i.api.location.type){case"grid":this.gridview.removeView(V(i.element));break;case"floating":{var s;let v=(s=this._floatingGroupService)===null||s===void 0?void 0:s.findByGroup(i);if(!v)throw new Error("dockview: failed to find floating group");this.detachFromNestedWindow(i)||v.dispose();break}case"popout":{var d,l;let v=(d=this._popoutWindowService)===null||d===void 0?void 0:d.findByGroup(i);if(!v)throw new Error("dockview: failed to find popout group");if(this.detachFromNestedWindow(i))break;if((l=this._popoutWindowService)===null||l===void 0||l.remove(v),v.referenceGroup){let p=this.getPanel(v.referenceGroup);p&&!p.api.isVisible&&this.doRemoveGroup(p,{skipActive:!0})}v.window.dispose();break}}if(n.api.location.type==="grid"||n.api.location.type==="floating"||n.api.location.type==="popout"){let v=this.getGridviewForGroup(n),p=V(n.element),u=Q(v.orientation,p,o),g;if(c)g=Le(o)==="HORIZONTAL"?i.api.width:i.api.height;else{var h;g=X.Split((h=p[p.length-1])!==null&&h!==void 0?h:0)}v.addView(r,g,u),this.setGroupLocationForRoot(r,v)}}if(((t=a)!==null&&t!==void 0?t:r.panels).forEach(c=>{this.fireDidMovePanel(c,i)}),this.debouncedUpdateAllPositions(),e.skipSetActive===!1){let c=n??i;this.doSetGroupAndPanelActive(c)}else r!==i&&e.skipSetActive!==!0&&this.doSetGroupAndPanelActive(r)}doSetGroupActive(e){var t;super.doSetGroupActive(e);let i=this.activePanel;!this._moving&&i!==((t=this._onDidActivePanelChange.value)===null||t===void 0?void 0:t.panel)&&this.fireActivePanelChange(i)}doSetGroupAndPanelActive(e){var t;super.doSetGroupActive(e);let i=this.activePanel;e&&this.hasMaximizedGroup()&&!this.isMaximizedGroup(e)&&this.exitMaximizedGroup(),!this._moving&&i!==((t=this._onDidActivePanelChange.value)===null||t===void 0?void 0:t.panel)&&this.fireActivePanelChange(i)}getNextGroupId(){let e=this.nextGroupId.next();for(;this._groups.has(e);)e=this.nextGroupId.next();return e}createGroup(e){var t;(t=e)!==null&&t!==void 0||(e={});let i=e?.id;if(i&&this._groups.has(e.id)&&(console.warn(`dockview: Duplicate group id ${e?.id}. reassigning group id to avoid errors`),i=void 0),!i)for(i=this.nextGroupId.next();this._groups.has(i);)i=this.nextGroupId.next();let n=new Te(this,i,e);if(n.init({params:{},accessor:this}),!this._groups.has(n.id)){let o=new k(n.model.onTabDragStart(r=>{var a;(a=this._advancedDnDService)===null||a===void 0||a.dispatchWillDragPanel(r)}),n.model.onGroupDragStart(r=>{var a;(a=this._advancedDnDService)===null||a===void 0||a.dispatchWillDragGroup(r)}),n.model.onMove(r=>{let{groupId:a,itemId:s,target:d,index:l,tabGroupId:h}=r;this.moveGroupOrPanel({from:{groupId:a,panelId:s,tabGroupId:h},to:{group:n,position:d,index:l}})}),n.model.onDidDrop(r=>{this._onDidDrop.fire(r)}),n.model.onWillDrop(r=>{var a;(a=this._advancedDnDService)===null||a===void 0||a.dispatchWillDrop(r)}),n.model.onWillShowOverlay(r=>{var a;if(this.options.disableDnd){r.preventDefault();return}(a=this._advancedDnDService)===null||a===void 0||a.dispatchWillShowOverlay(r)}),n.model.onUnhandledDragOver(r=>{this._onUnhandledDragOver.fire(r)}),n.model.onDidAddPanel(r=>{this._moving||this._onDidAddPanel.fire(r.panel)}),n.model.onDidRemovePanel(r=>{this._moving||this._onDidRemovePanel.fire(r.panel)}),n.model.onDidActivePanelChange(r=>{var a;this._moving||r.panel===this.activePanel&&((a=this._onDidActivePanelChange.value)===null||a===void 0?void 0:a.panel)!==r.panel&&this.fireActivePanelChange(r.panel)}),q.any(n.model.onDidPanelTitleChange,n.model.onDidPanelParametersChange)(()=>{this._bufferOnDidLayoutChange.fire()}));this._groups.set(n.id,{value:n,disposable:o})}return n.initialize(),n}createPanel(e,t){var i,n,o;let r=e.component,a=(i=e.tabComponent)!==null&&i!==void 0?i:this.options.defaultTabComponent,s=new Pi(this,e.id,r,a),d=new we(e.id,r,a,this,this._api,t,s,{renderer:e.renderer,minimumWidth:e.minimumWidth,minimumHeight:e.minimumHeight,maximumWidth:e.maximumWidth,maximumHeight:e.maximumHeight});return d.init({title:(n=e.title)!==null&&n!==void 0?n:e.id,params:(o=e?.params)!==null&&o!==void 0?o:{}}),d}dropSizing(e){return X.Split(e.length===0?0:e[e.length-1])}createGroupAtLocation(e,t,i,n=this.gridview){let o=this.createGroup(i);return this.doAddGroup(o,e,t,n),this.setGroupLocationForRoot(o,n),o}setGroupLocationForRoot(e,t){var i;let n=(i=this._popoutWindowService)===null||i===void 0?void 0:i.entries.find(o=>o.gridview===t);if(n){e.model.renderContainer!==n.overlayRenderContainer&&(e.model.renderContainer=n.overlayRenderContainer),e.model.dropTargetContainer=n.dropTargetContainer,e.model.location={type:"popout",getWindow:n.getWindow,popoutUrl:n.popoutUrl};return}e.model.renderContainer!==this.overlayRenderContainer&&(e.model.renderContainer=this.overlayRenderContainer),e.model.dropTargetContainer=this.rootDropTargetContainer,e.model.location=t===this.gridview?{type:"grid"}:{type:"floating"}}getGridviewForGroup(e){var t,i;let n=(t=this._floatingGroupService)===null||t===void 0?void 0:t.findByGroup(e);if(n)return n.gridview;let o=(i=this._popoutWindowService)===null||i===void 0?void 0:i.findByGroup(e);return o?o.gridview:this.gridview}nestedWindowMembers(e){let t=this.getGridviewForGroup(e);return t===this.gridview?[]:this.groups.filter(i=>t.element.contains(i.element))}findGroup(e){var t;return(t=Array.from(this._groups.values()).find(i=>i.value.model.containsPanel(e)))===null||t===void 0?void 0:t.value}orientationAtLocation(e){let t=this.gridview.orientation;return e.length%2==1?t:de(t)}updateTheme(){var e,t,i,n,o,r,a,s;let d=(e=this._options.theme)!==null&&e!==void 0?e:zi;(t=this._shellThemeClassnames)===null||t===void 0||t.setClassNames(d.className);let l=(i=d.gap)!==null&&i!==void 0?i:0;this.gridview.margin=l;for(let p of this.floatingGroups)p.gridview.margin=l;for(let p of(n=(o=this._popoutWindowService)===null||o===void 0?void 0:o.entries)!==null&&n!==void 0?n:[])p.gridview.margin=l;if((r=this._shellManager)===null||r===void 0||r.updateTheme(l,(a=d.edgeGroupCollapsedSize)!==null&&a!==void 0?a:35),d.dndOverlayBorder===void 0){var h;this.element.style.removeProperty("--dv-drag-over-border"),(h=this._shellManager)===null||h===void 0||h.element.style.removeProperty("--dv-drag-over-border")}else{var c;this.element.style.setProperty("--dv-drag-over-border",d.dndOverlayBorder),(c=this._shellManager)===null||c===void 0||c.element.style.setProperty("--dv-drag-over-border",d.dndOverlayBorder)}d.dndOverlayMounting==="absolute"?this.rootDropTargetContainer.disabled=!1:this.rootDropTargetContainer.disabled=!0;let v=((s=d.tabGroupIndicator)!==null&&s!==void 0?s:"wrap")==="none";x(this.element,"dv-tab-group-indicator-none",v),this._shellManager&&x(this._shellManager.element,"dv-tab-group-indicator-none",v);for(let p of this.groups)p.model.updateTabGroups()}},nn=class extends pt{get orientation(){return this.gridview.orientation}set orientation(e){this.gridview.orientation=e}get options(){return this._options}get deserializer(){return this._deserializer}set deserializer(e){this._deserializer=e}constructor(e,t){var i;super(e,{proportionalLayout:(i=t.proportionalLayout)!==null&&i!==void 0?i:!0,orientation:t.orientation,styles:t.hideBorders?{separatorBorder:"transparent"}:void 0,disableAutoResizing:t.disableAutoResizing,className:t.className}),this._onDidLayoutfromJSON=new m,this.onDidLayoutFromJSON=this._onDidLayoutfromJSON.event,this._onDidRemoveGroup=new m,this.onDidRemoveGroup=this._onDidRemoveGroup.event,this._onDidAddGroup=new m,this.onDidAddGroup=this._onDidAddGroup.event,this._onDidActiveGroupChange=new m,this.onDidActiveGroupChange=this._onDidActiveGroupChange.event,this._options=t,this.addDisposables(this._onDidAddGroup,this._onDidRemoveGroup,this._onDidActiveGroupChange,this.onDidAdd(n=>{this._onDidAddGroup.fire(n)}),this.onDidRemove(n=>{this._onDidRemoveGroup.fire(n)}),this.onDidActiveChange(n=>{this._onDidActiveGroupChange.fire(n)}))}updateOptions(e){super.updateOptions(e);let t=typeof e.orientation=="string"&&this.gridview.orientation!==e.orientation;this._options=G(G({},this.options),e),t&&(this.gridview.orientation=e.orientation),this.layout(this.gridview.width,this.gridview.height,!0)}removePanel(e){this.removeGroup(e)}toJSON(){var e;return{grid:this.gridview.serialize(),activePanel:(e=this.activeGroup)===null||e===void 0?void 0:e.id}}setVisible(e,t){this.gridview.setViewVisible(V(e.element),t)}setActive(e){this._groups.forEach((t,i)=>{t.value.setActive(e===t.value)})}focus(){var e;(e=this.activeGroup)===null||e===void 0||e.focus()}fromJSON(e){this.clear();let{grid:t,activePanel:i}=e;try{let n=[],o=this.width,r=this.height;if(this.gridview.deserialize(t,{fromJSON:a=>{let{data:s}=a,d=this.options.createComponent({id:s.id,name:s.component});return n.push(()=>d.init({params:s.params,minimumWidth:s.minimumWidth,maximumWidth:s.maximumWidth,minimumHeight:s.minimumHeight,maximumHeight:s.maximumHeight,priority:s.priority,snap:!!s.snap,accessor:this,isVisible:a.visible})),this._onDidAddGroup.fire(d),this.registerPanel(d),d}}),this.layout(o,r,!0),n.forEach(a=>a()),typeof i=="string"){let a=this.getPanel(i);a&&this.doSetGroupActive(a)}}catch(n){for(let o of this.groups)o.dispose(),this._groups.delete(o.id),this._onDidRemoveGroup.fire(o);throw this.clear(),n}this._onDidLayoutfromJSON.fire()}clear(){let e=this.activeGroup,t=Array.from(this._groups.values());for(let i of t)i.disposable.dispose(),this.doRemoveGroup(i.value,{skipActive:!0});e&&this.doSetGroupActive(void 0),this.gridview.clear()}movePanel(e,t){var i;let n=(i=this._groups.get(t.reference))===null||i===void 0?void 0:i.value;if(!n)throw new Error(`reference group ${t.reference} does not exist`);let o=ze(t.direction);if(o==="center")throw new Error(`${o} not supported as an option`);let r=V(n.element),a=Q(this.gridview.orientation,r,o),s=this.gridview.remove(e);this.doAddGroup(s,a,t.size)}addPanel(e){var t,i,n;let o=(t=e.location)!==null&&t!==void 0?t:[0];if(!((i=e.position)===null||i===void 0)&&i.referencePanel){var r;let s=(r=this._groups.get(e.position.referencePanel))===null||r===void 0?void 0:r.value;if(!s)throw new Error(`reference group ${e.position.referencePanel} does not exist`);let d=ze(e.position.direction);if(d==="center")throw new Error(`${d} not supported as an option`);{let l=V(s.element);o=Q(this.gridview.orientation,l,d)}}let a=this.options.createComponent({id:e.id,name:e.component});return a.init({params:(n=e.params)!==null&&n!==void 0?n:{},minimumWidth:e.minimumWidth,maximumWidth:e.maximumWidth,minimumHeight:e.minimumHeight,maximumHeight:e.maximumHeight,priority:e.priority,snap:!!e.snap,accessor:this,isVisible:!0}),this.doAddGroup(a,o,e.size),this.registerPanel(a),this.doSetGroupActive(a),a}registerPanel(e){let t=new k(e.api.onDidFocusChange(i=>{i.isFocused&&this._groups.forEach(n=>{let o=n.value;o.setActive(o===e)})}));this._groups.set(e.id,{value:e,disposable:t})}moveGroup(e,t,i){let n=this.getPanel(t);if(!n)throw new Error("invalid operation");let o=V(e.element),[r,a]=ae(Q(this.gridview.orientation,o,i)),[s,d]=ae(V(n.element));if(nt(s,r)){this.gridview.moveView(s,d,a);return}let l=this.doRemoveGroup(n,{skipActive:!0,skipDispose:!0}),h=V(e.element),c=Q(this.gridview.orientation,h,i);this.doAddGroup(l,c)}removeGroup(e){super.removeGroup(e)}dispose(){super.dispose(),this._onDidLayoutfromJSON.dispose()}},on=class extends vt{get panels(){return this.splitview.getViews()}get options(){return this._options}get length(){return this._panels.size}get orientation(){return this.splitview.orientation}get splitview(){return this._splitview}set splitview(e){this._splitview&&this._splitview.dispose(),this._splitview=e,this._splitviewChangeDisposable.value=new k(this._splitview.onDidSashEnd(()=>{this._onDidLayoutChange.fire(void 0)}),this._splitview.onDidAddView(t=>this._onDidAddView.fire(t)),this._splitview.onDidRemoveView(t=>this._onDidRemoveView.fire(t)))}get minimumSize(){return this.splitview.minimumSize}get maximumSize(){return this.splitview.maximumSize}get height(){return this.splitview.orientation==="HORIZONTAL"?this.splitview.orthogonalSize:this.splitview.size}get width(){return this.splitview.orientation==="HORIZONTAL"?this.splitview.size:this.splitview.orthogonalSize}constructor(e,t){var i;super(document.createElement("div"),t.disableAutoResizing),this._splitviewChangeDisposable=new H,this._panels=new Map,this._onDidLayoutfromJSON=new m,this.onDidLayoutFromJSON=this._onDidLayoutfromJSON.event,this._onDidAddView=new m,this.onDidAddView=this._onDidAddView.event,this._onDidRemoveView=new m,this.onDidRemoveView=this._onDidRemoveView.event,this._onDidLayoutChange=new m,this.onDidLayoutChange=this._onDidLayoutChange.event,this.element.style.height="100%",this.element.style.width="100%",this._classNames=new Oe(this.element),this._classNames.setClassNames((i=t.className)!==null&&i!==void 0?i:""),e.appendChild(this.element),this._options=t,this.splitview=new be(this.element,t),this.addDisposables(this._onDidAddView,this._onDidLayoutfromJSON,this._onDidRemoveView,this._onDidLayoutChange)}updateOptions(e){if("className"in e){var t;this._classNames.setClassNames((t=e.className)!==null&&t!==void 0?t:"")}if("disableResizing"in e){var i;this.disableResizing=(i=e.disableAutoResizing)!==null&&i!==void 0?i:!1}typeof e.orientation=="string"&&(this.splitview.orientation=e.orientation),this._options=G(G({},this.options),e),this.splitview.layout(this.splitview.size,this.splitview.orthogonalSize)}focus(){var e;(e=this._activePanel)===null||e===void 0||e.focus()}movePanel(e,t){this.splitview.moveView(e,t)}setVisible(e,t){let i=this.panels.indexOf(e);this.splitview.setViewVisible(i,t)}setActive(e,t){this._activePanel=e,this.panels.filter(i=>i!==e).forEach(i=>{i.api._onDidActiveChange.fire({isActive:!1}),t||i.focus()}),e.api._onDidActiveChange.fire({isActive:!0}),t||e.focus()}removePanel(e,t){let i=this._panels.get(e.id);if(!i)throw new Error(`unknown splitview panel ${e.id}`);i.dispose(),this._panels.delete(e.id);let n=this.panels.indexOf(e);this.splitview.removeView(n,t).dispose();let o=this.panels;o.length>0&&this.setActive(o[o.length-1])}getPanel(e){return this.panels.find(t=>t.id===e)}addPanel(e){var t;if(this._panels.has(e.id))throw new Error(`panel ${e.id} already exists`);let i=this.options.createComponent({id:e.id,name:e.component});i.orientation=this.splitview.orientation,i.init({params:(t=e.params)!==null&&t!==void 0?t:{},minimumSize:e.minimumSize,maximumSize:e.maximumSize,snap:e.snap,priority:e.priority,accessor:this});let n=typeof e.size=="number"?e.size:X.Distribute,o=typeof e.index=="number"?e.index:void 0;return this.splitview.addView(i,n,o),this.doAddView(i),this.setActive(i),i}layout(e,t){let[i,n]=this.splitview.orientation==="HORIZONTAL"?[e,t]:[t,e];this.splitview.layout(i,n)}doAddView(e){let t=e.api.onDidFocusChange(i=>{i.isFocused&&this.setActive(e,!0)});this._panels.set(e.id,t)}toJSON(){var e;return{views:this.splitview.getViews().map((t,i)=>({size:this.splitview.getViewSize(i),data:t.toJSON(),snap:!!t.snap,priority:t.priority})),activeView:(e=this._activePanel)===null||e===void 0?void 0:e.id,size:this.splitview.size,orientation:this.splitview.orientation}}fromJSON(e){this.clear();let{views:t,orientation:i,size:n,activeView:o}=e,r=[],a=this.width,s=this.height;if(this.splitview=new be(this.element,{orientation:i,proportionalLayout:this.options.proportionalLayout,descriptor:{size:n,views:t.map(d=>{let l=d.data;if(this._panels.has(l.id))throw new Error(`panel ${l.id} already exists`);let h=this.options.createComponent({id:l.id,name:l.component});return r.push(()=>{var c;h.init({params:(c=l.params)!==null&&c!==void 0?c:{},minimumSize:l.minimumSize,maximumSize:l.maximumSize,snap:d.snap,priority:d.priority,accessor:this})}),h.orientation=i,this.doAddView(h),setTimeout(()=>{this._onDidAddView.fire(h)},0),{size:d.size,view:h}})}}),this.layout(a,s),r.forEach(d=>d()),typeof o=="string"){let d=this.getPanel(o);d&&this.setActive(d)}this._onDidLayoutfromJSON.fire()}clear(){for(let e of this._panels.values())e.dispose();for(this._panels.clear();this.splitview.length>0;)this.splitview.removeView(0,X.Distribute,!0).dispose()}dispose(){for(let t of this._panels.values())t.dispose();this._panels.clear();let e=this.splitview.getViews();this._splitviewChangeDisposable.dispose(),this.splitview.dispose();for(let t of e)t.dispose();this.element.remove(),super.dispose()}},rn=class extends k{get element(){return this._element}constructor(){super(),this._expandedIcon=po(),this._collapsedIcon=pi(),this.disposable=new H,this.apiRef={api:null},this._element=document.createElement("div"),this.element.className="dv-default-header",this._content=document.createElement("span"),this._expander=document.createElement("div"),this._expander.className="dv-pane-header-icon",this.element.appendChild(this._expander),this.element.appendChild(this._content),this.addDisposables(C(this._element,"click",()=>{var e;(e=this.apiRef.api)===null||e===void 0||e.setExpanded(!this.apiRef.api.isExpanded)}))}init(e){this.apiRef.api=e.api,this._content.textContent=e.title,this.updateIcon(),this.disposable.value=e.api.onDidExpansionChange(()=>{this.updateIcon()})}updateIcon(){var e;let t=!!(!((e=this.apiRef.api)===null||e===void 0)&&e.isExpanded);x(this._expander,"collapsed",!t),t?(this._expander.contains(this._collapsedIcon)&&this._collapsedIcon.remove(),this._expander.contains(this._expandedIcon)||this._expander.appendChild(this._expandedIcon)):(this._expander.contains(this._expandedIcon)&&this._expandedIcon.remove(),this._expander.contains(this._collapsedIcon)||this._expander.appendChild(this._collapsedIcon))}update(e){}dispose(){this.disposable.dispose(),super.dispose()}};let Ur=rt(),an=22,sn=0,dn=Number.MAX_SAFE_INTEGER;var It=class extends hi{constructor(e){super({accessor:e.accessor,id:e.id,component:e.component,headerComponent:e.headerComponent,orientation:e.orientation,isExpanded:e.isExpanded,disableDnd:e.disableDnd,headerSize:e.headerSize,minimumBodySize:e.minimumBodySize,maximumBodySize:e.maximumBodySize}),this.options=e}getBodyComponent(){return this.options.body}getHeaderComponent(){return this.options.header}},ln=class extends vt{get id(){return this._id}get panels(){return this.paneview.getPanes()}set paneview(e){this._paneview=e,this._disposable.value=new k(this._paneview.onDidChange(()=>{this._onDidLayoutChange.fire(void 0)}),this._paneview.onDidAddView(t=>this._onDidAddView.fire(t)),this._paneview.onDidRemoveView(t=>this._onDidRemoveView.fire(t)))}get paneview(){return this._paneview}get minimumSize(){return this.paneview.minimumSize}get maximumSize(){return this.paneview.maximumSize}get height(){return this.paneview.orientation==="HORIZONTAL"?this.paneview.orthogonalSize:this.paneview.size}get width(){return this.paneview.orientation==="HORIZONTAL"?this.paneview.size:this.paneview.orthogonalSize}get options(){return this._options}constructor(e,t){var i;super(document.createElement("div"),t.disableAutoResizing),this._id=Ur.next(),this._disposable=new H,this._viewDisposables=new Map,this._onDidLayoutfromJSON=new m,this.onDidLayoutFromJSON=this._onDidLayoutfromJSON.event,this._onDidLayoutChange=new m,this.onDidLayoutChange=this._onDidLayoutChange.event,this._onDidDrop=new m,this.onDidDrop=this._onDidDrop.event,this._onDidAddView=new m,this.onDidAddView=this._onDidAddView.event,this._onDidRemoveView=new m,this.onDidRemoveView=this._onDidRemoveView.event,this._onUnhandledDragOver=new m,this.onUnhandledDragOver=this._onUnhandledDragOver.event,this.element.style.height="100%",this.element.style.width="100%",this.addDisposables(this._onDidLayoutChange,this._onDidLayoutfromJSON,this._onDidDrop,this._onDidAddView,this._onDidRemoveView,this._onUnhandledDragOver),this._classNames=new Oe(this.element),this._classNames.setClassNames((i=t.className)!==null&&i!==void 0?i:""),e.appendChild(this.element),this._options=t,this.paneview=new at(this.element,{orientation:"VERTICAL"}),this.addDisposables(this._disposable)}setVisible(e,t){let i=this.panels.indexOf(e);this.paneview.setViewVisible(i,t)}focus(){}updateOptions(e){if("className"in e){var t;this._classNames.setClassNames((t=e.className)!==null&&t!==void 0?t:"")}if("disableAutoResizing"in e){var i;this.disableResizing=(i=e.disableAutoResizing)!==null&&i!==void 0?i:!1}this._options=G(G({},this.options),e)}addPanel(e){var t,i,n;let o=this.options.createComponent({id:e.id,name:e.component}),r;e.headerComponent&&this.options.createHeaderComponent&&(r=this.options.createHeaderComponent({id:e.id,name:e.headerComponent})),(t=r)!==null&&t!==void 0||(r=new rn);let a=new It({id:e.id,component:e.component,headerComponent:e.headerComponent,header:r,body:o,orientation:"VERTICAL",isExpanded:!!e.isExpanded,disableDnd:!!this.options.disableDnd,accessor:this,headerSize:(i=e.headerSize)!==null&&i!==void 0?i:an,minimumBodySize:sn,maximumBodySize:dn});this.doAddPanel(a);let s=typeof e.size=="number"?e.size:X.Distribute,d=typeof e.index=="number"?e.index:void 0;return a.init({params:(n=e.params)!==null&&n!==void 0?n:{},minimumBodySize:e.minimumBodySize,maximumBodySize:e.maximumBodySize,isExpanded:e.isExpanded,title:e.title,containerApi:new Se(this),accessor:this}),this.paneview.addPane(a,s,d),a.orientation=this.paneview.orientation,a}removePanel(e){let t=this.panels.indexOf(e);this.paneview.removePane(t),this.doRemovePanel(e)}movePanel(e,t){this.paneview.moveView(e,t)}getPanel(e){return this.panels.find(t=>t.id===e)}layout(e,t){let[i,n]=this.paneview.orientation==="HORIZONTAL"?[e,t]:[t,e];this.paneview.layout(i,n)}toJSON(){let e=i=>i===Number.MAX_SAFE_INTEGER||i===Number.POSITIVE_INFINITY?void 0:i,t=i=>i<=0?void 0:i;return{views:this.paneview.getPanes().map((i,n)=>{let o=this.paneview.getViewCachedVisibleSize(n),r=typeof o=="number";return G({size:r?o:this.paneview.getViewSize(n),data:i.toJSON(),minimumSize:t(i.minimumBodySize),maximumSize:e(i.maximumBodySize),headerSize:i.headerSize,expanded:i.isExpanded()},r?{visible:!1}:{})}),size:this.paneview.size}}fromJSON(e){this.clear();let{views:t,size:i}=e,n=[],o=this.width,r=this.height;this.paneview=new at(this.element,{orientation:"VERTICAL",descriptor:{size:i,views:t.map(a=>{var s,d,l,h;let c=a.data,v=this.options.createComponent({id:c.id,name:c.component}),p;c.headerComponent&&this.options.createHeaderComponent&&(p=this.options.createHeaderComponent({id:c.id,name:c.headerComponent})),(s=p)!==null&&s!==void 0||(p=new rn);let u=new It({id:c.id,component:c.component,headerComponent:c.headerComponent,header:p,body:v,orientation:"VERTICAL",isExpanded:!!a.expanded,disableDnd:!!this.options.disableDnd,accessor:this,headerSize:(d=a.headerSize)!==null&&d!==void 0?d:an,minimumBodySize:(l=a.minimumSize)!==null&&l!==void 0?l:sn,maximumBodySize:(h=a.maximumSize)!==null&&h!==void 0?h:dn});return this.doAddPanel(u),n.push(()=>{var g;u.init({params:(g=c.params)!==null&&g!==void 0?g:{},minimumBodySize:a.minimumSize,maximumBodySize:a.maximumSize,title:c.title,isExpanded:!!a.expanded,containerApi:new Se(this),accessor:this}),u.orientation=this.paneview.orientation}),setTimeout(()=>{this._onDidAddView.fire(u)},0),{size:a.size,view:u,visible:a.visible}})}}),this.layout(o,r),n.forEach(a=>a()),this._onDidLayoutfromJSON.fire()}clear(){for(let[e,t]of this._viewDisposables.entries())t.dispose();this._viewDisposables.clear(),this.paneview.dispose()}doAddPanel(e){let t=new k(e.onDidDrop(i=>{this._onDidDrop.fire(i)}),e.onUnhandledDragOver(i=>{this._onUnhandledDragOver.fire(i)}));this._viewDisposables.set(e.id,t)}doRemovePanel(e){let t=this._viewDisposables.get(e.id);t&&(t.dispose(),this._viewDisposables.delete(e.id))}dispose(){super.dispose();for(let[e,t]of this._viewDisposables.entries())t.dispose();this._viewDisposables.clear(),this.element.remove(),this.paneview.dispose()}},Yr=class extends ft{get priority(){return this._priority}set orientation(e){this._orientation=e}get orientation(){return this._orientation}get minimumSize(){let e=typeof this._minimumSize=="function"?this._minimumSize():this._minimumSize;return e!==this._evaluatedMinimumSize&&(this._evaluatedMinimumSize=e,this.updateConstraints()),e}get maximumSize(){let e=typeof this._maximumSize=="function"?this._maximumSize():this._maximumSize;return e!==this._evaluatedMaximumSize&&(this._evaluatedMaximumSize=e,this.updateConstraints()),e}get snap(){return this._snap}constructor(e,t){super(e,t,new di(e,t)),this._evaluatedMinimumSize=0,this._evaluatedMaximumSize=Number.POSITIVE_INFINITY,this._minimumSize=0,this._maximumSize=Number.POSITIVE_INFINITY,this._snap=!1,this._onDidChange=new m,this.onDidChange=this._onDidChange.event,this.api.initialize(this),this.addDisposables(this._onDidChange,this.api.onWillVisibilityChange(i=>{let{isVisible:n}=i,{accessor:o}=this._params;o.setVisible(this,n)}),this.api.onActiveChange(()=>{let{accessor:i}=this._params;i.setActive(this)}),this.api.onDidConstraintsChangeInternal(i=>{(typeof i.minimumSize=="number"||typeof i.minimumSize=="function")&&(this._minimumSize=i.minimumSize),(typeof i.maximumSize=="number"||typeof i.maximumSize=="function")&&(this._maximumSize=i.maximumSize),this.updateConstraints()}),this.api.onDidSizeChange(i=>{this._onDidChange.fire({size:i.size})}))}setVisible(e){this.api._onDidVisibilityChange.fire({isVisible:e})}setActive(e){this.api._onDidActiveChange.fire({isActive:e})}layout(e,t){let[i,n]=this.orientation==="HORIZONTAL"?[e,t]:[t,e];super.layout(i,n)}init(e){super.init(e),this._priority=e.priority,e.minimumSize&&(this._minimumSize=e.minimumSize),e.maximumSize&&(this._maximumSize=e.maximumSize),e.snap&&(this._snap=e.snap)}toJSON(){let e=i=>i===Number.MAX_SAFE_INTEGER||i===Number.POSITIVE_INFINITY?void 0:i,t=i=>i<=0?void 0:i;return G(G({},super.toJSON()),{},{minimumSize:t(this.minimumSize),maximumSize:e(this.maximumSize)})}updateConstraints(){this.api._onDidConstraintsChange.fire({maximumSize:this._evaluatedMaximumSize,minimumSize:this._evaluatedMinimumSize})}};function Xr(e,t){return new tn(e,t).api}function Zr(e,t){return new Jt(new on(e,t))}function Jr(e,t){return new Kt(new nn(e,t))}function Kr(e,t){return new Se(new ln(e,t))}f.AdvancedDnDModule=Wi,f.AdvancedDnDService=Ni,f.BaseGrid=pt,f.ContentContainer=ci,f.ContextMenuController=Xi,f.ContextMenuModule=Zi,f.DEFAULT_TAB_GROUP_COLORS=He,f.DefaultDockviewDeserialzier=Ti,f.DefaultTab=Gt,f.DockviewApi=Ve,f.DockviewComponent=tn,f.DockviewCompositeDisposable=k,f.DockviewDidDropEvent=Ue,Object.defineProperty(f,"DockviewDisposable",{enumerable:!0,get:function(){return M}}),f.DockviewEmitter=m,Object.defineProperty(f,"DockviewEvent",{enumerable:!0,get:function(){return q}}),f.DockviewGroupPanel=Te,f.DockviewGroupPanelModel=ki,f.DockviewMutableDisposable=H,f.DockviewPanel=we,f.DockviewUnhandledDragOverEvent=xt,f.DockviewWillDropEvent=St,f.DockviewWillShowOverlayLocationEvent=ke,f.DraggablePaneviewPanel=hi,f.EdgeGroupModule=Li,f.FloatingGroupModule=Mi,f.Gridview=ct,f.GridviewApi=Kt,f.GridviewComponent=nn,f.GridviewPanel=Gi,f.LayoutPriority=Ln,f.LiveRegionModule=$i,f.LocalSelectionTransfer=ue,f.OVERFLOW_MAX_TAB_ROWS_VARIABLE=Do,f.OVERFLOW_WRAP_TABS_CAPPED_CLASS=wo,f.OVERFLOW_WRAP_TABS_CLASS=Dt,f.OVERFLOW_WRAP_TABS_VERTICAL_TAB_HEIGHT_VARIABLE=xo,f.Orientation=On,f.PROPERTY_KEYS_DOCKVIEW=yo,f.PROPERTY_KEYS_GRIDVIEW=Vn,f.PROPERTY_KEYS_PANEVIEW=lo,f.PROPERTY_KEYS_SPLITVIEW=Rn,f.PaneFramework=It,f.PaneTransfer=te,f.PanelTransfer=J,f.Paneview=at,f.PaneviewApi=Se,f.PaneviewComponent=ln,f.PaneviewPanel=li,f.PaneviewUnhandledDragOverEvent=ri,f.SashState=Mn,Object.defineProperty(f,"Sizing",{enumerable:!0,get:function(){return X}}),f.Splitview=be,f.SplitviewApi=Jt,f.SplitviewComponent=on,f.SplitviewPanel=Yr,f.Tab=ui,f.TabGroupChipsModule=Fi,f.TabGroupChipsService=Hi,f.TabGroupColorPalette=yt,f.applyTabGroupAccent=Fe,f.clearRegisteredModules=sr,f.createCloseButton=vi,f.createDismissableLayer=Qi,f.createDockview=Xr,f.createGridview=Jr,f.createPaneview=Kr,f.createPinButton=_t,f.createSplitview=Zr,f.defineModule=ce,f.directionToPosition=mt,f.findRelativeZIndexParent=it,f.getDirectionOrientation=Le,f.getGridLocation=V,f.getLocationOrientation=lt,f.getPaneData=Ce,f.getPanelData=$,f.getRegisteredModules=Oi,f.getRelativeLocation=Q,f.indexInParent=Yt,f.isAnyEdgeGroupEnabled=We,f.isEdgeGroupEnabled=bi,f.isGridBranchNode=Xt,f.isGroupOptionsWithGroup=Di,f.isGroupOptionsWithPanel=wi,f.isPanelOptionsWithGroup=_i,f.isPanelOptionsWithPanel=fi,f.orthogonal=de,f.positionToDirection=ii,f.prefersReducedMotion=Tn,f.registerModules=ar,f.resolveMessages=ut,f.resolveOpaqueBackground=In,f.resolveTabGroupAccent=Be,f.themeAbyss=zi,f.themeAbyssSpaced=Wo,f.themeCatppuccinMocha=Uo,f.themeCatppuccinMochaSpaced=Yo,f.themeDark=Ro,f.themeDracula=No,f.themeGithubDark=Ko,f.themeGithubDarkSpaced=jo,f.themeGithubLight=qo,f.themeGithubLightSpaced=Qo,f.themeLight=Vo,f.themeLightSpaced=Ho,f.themeMonokai=Xo,f.themeNord=Fo,f.themeNordSpaced=Bo,f.themeSolarizedLight=Zo,f.themeSolarizedLightSpaced=Jo,f.themeVisualStudio=$o,f.toTarget=ze})});var Ee=ra(fn());var export_DockviewComponent=Ee.DockviewComponent;var export_createDockview=Ee.createDockview;var export_themeAbyss=Ee.themeAbyss;var export_themeDark=Ee.themeDark;var export_themeLight=Ee.themeLight;export{export_DockviewComponent as DockviewComponent,export_createDockview as createDockview,export_themeAbyss as themeAbyss,export_themeDark as themeDark,export_themeLight as themeLight};
/*! Bundled license information:

dockview-core/dist/dockview-core.js:
  (**
   * dockview-core
   * @version 8.3.1
   * @link https://github.com/dockview/dockview
   * @license MIT
   *)
*/
