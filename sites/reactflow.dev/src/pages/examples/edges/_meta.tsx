import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'custom-edges': 'Custom Edges',
  'animating-edges': 'Animating Edges',
  'edge-types': 'Edge Types',
  'editable-edge': 'Editable Edge',
  'reconnect-edge': 'Reconnect Edge',
  'custom-connectionline': 'Connection Line',
  'multi-connection-line': 'Multi Connection Line',
  markers: 'Edge Markers',
  'delete-edge-on-drop': 'Delete Edge on Drop',
  'floating-edges': 'Floating Edges',
  'simple-floating-edges': 'Simple Floating Edges',
  'edge-label-renderer': 'Edge Label Renderer',
  'temporary-edges': 'Temporary Edges',
};

export default getMetaConfigFromTitleLookup(titleLookup, '/examples/edges');
