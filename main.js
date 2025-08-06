let allNodes = [];
let allLinks = [];
let graph;

fetch('grid_topology.geojson')
  .then(res => res.json())
  .then(geojson => {
    const nodes = [];
    const links = [];
    const nodeMap = {};

    geojson.features.forEach(feature => {
      if (feature.geometry.type === 'Point') {
        const id = feature.properties.id;
        const node = { id, ...feature.properties };
        nodes.push(node);
        nodeMap[id] = node;
      }
    });

    geojson.features.forEach(feature => {
      if (feature.geometry.type === 'LineString') {
        const props = feature.properties || {};
        if (props.from && props.to && nodeMap[props.from] && nodeMap[props.to]) {
          links.push({
            source: props.from,
            target: props.to,
            ...props
          });
        }
      }
    });

    allNodes = nodes;
    allLinks = links;

    const regionColors = {
      "North": "#1f77b4",
      "Central": "#2ca02c",
      "South": "#d62728"
    };
    const statusColors = {
      "active": "#00e676",
      "maintenance": "#ff7f0e",
      "inactive": "#d62728"
    };

    graph = ForceGraph3D()(document.getElementById('3d-graph'))
      .graphData({ nodes, links })
      .linkWidth(() => 1)
      .nodeColor(node => regionColors[node.region] || "#cccc66")
      .linkColor(link => statusColors[link.status] || "#222")
      .nodeLabel(node =>
        `<b>${node.name}</b><br/>
        Voltage: ${node.voltage} kV<br/>
        Capacity: ${node.capacity || "?"} MW<br/>
        Region: ${node.region || "?"}<br/>
        Owner: ${node.owner || "?"}`
      )
      .linkLabel(link =>
        `<b>${link.name}</b><br/>
        Voltage: ${link.voltage} kV<br/>
        Status: ${link.status}<br/>
        Capacity: ${link.capacity || "?"} MW<br/>
        Region: ${link.region || "?"}<br/>
        Owner: ${link.owner || "?"}`
      );
  });

function applyFilters() {
  const owner = document.getElementById('ownerFilter').value;
  const region = document.getElementById('regionFilter').value;
  const voltage = parseInt(document.getElementById('voltageFilter').value);

  const filteredNodes = allNodes.filter(n =>
    (!owner || n.owner === owner) &&
    (!region || n.region === region) &&
    (!voltage || n.voltage >= voltage)
  );
  const nodeIds = new Set(filteredNodes.map(n => n.id));
  const filteredLinks = allLinks.filter(l => {
  const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
  const targetId = typeof l.target === 'object' ? l.target.id : l.target;
  return nodeIds.has(sourceId) && nodeIds.has(targetId);
});

  if (graph) {
    graph.graphData({ nodes: filteredNodes, links: filteredLinks });
  }
}

['ownerFilter', 'regionFilter', 'voltageFilter'].forEach(id => {
  document.getElementById(id).addEventListener('change', applyFilters);
});