fetch('grid_topology.geojson')
  .then(res => res.json())
  .then(geojson => {
    const nodes = [];
    const links = [];
    const nodeMap = {};

    // Collect all Point features as nodes
    geojson.features.forEach(feature => {
      if (feature.geometry.type === 'Point') {
        const id = feature.properties.id;
        const node = { id, ...feature.properties };
        nodes.push(node);
        nodeMap[id] = node;
      }
    });

    // Collect all LineString features as links
    geojson.features.forEach(feature => {
      if (feature.geometry.type === 'LineString') {
        const props = feature.properties || {};
        // Use 'from' and 'to' as source and target
        if (props.from && props.to && nodeMap[props.from] && nodeMap[props.to]) {
          links.push({
            source: props.from,
            target: props.to,
            ...props
          });
        }
      }
    });

    ForceGraph3D()(document.getElementById('3d-graph'))
      .graphData({ nodes, links });
  });