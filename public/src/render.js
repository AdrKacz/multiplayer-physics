const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width = 800;
const height = canvas.height = 800;

const canvasBounds = {
  min: {
    x: 0,
    y: 0,
  },
  max: {
    x: width,
    y: height,
  },
};

function drawObject(object) {
  ctx.beginPath();
  ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  ctx.fillRect(object.position.x, object.position.y, 80, 80);
}

function optimizeBodies(allBodies) {
  // filter out bodies that are not in view
  const bodies = [];
  allBodies.forEach((body, i) => {
    if (Bounds.overlaps(body.bounds, render.bounds)) {
      bodies.push(body);
    };
  });

  return bodies;
};

function optimizeConstraints(allConstraints) {
  // filter out constraints that are not in view
  const constraints = [];
  allConstraints.forEach((constraint, i) => {
    const bodyA = constraint.bodyA;
    const bodyB = constraint.bodyB;
    const pointAWorld = constraint.pointA;
    const pointBWorld = constraint.pointB;

    if (bodyA) {
      pointAWorld = Vector.add(bodyA.position, constraint.pointA);
    }

    if (bodyB) {
      pointBWorld = Vector.add(bodyB.position, constraint.pointB);
    }

    if (!pointAWorld || !pointBWorld) {
      return;
    };

    if (Bounds.contains(render.bounds, pointAWorld) || Bounds.contains(render.bounds, pointBWorld)) {
      constraints.push(constraint);
    };
  });

  return constraints;
}

function renderWorld() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);

  const allBodies = Composite.allBodies(engine.world);
  // const allConstraints = Composite.allConstraints(engine.world);

  // const bodies = optimizeBodies(allBodies);
  // const constraints = optimizeConstraints(allConstraints);

  const bodies = allBodies;
  // const constraints = allConstraints;

  bodies.forEach((body, i) => {
    if (!body.render.visible) {
      return;
    };

    // handle compound parts
    for (let k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
      part = body.parts[k];

      if (!part.render.visible)
      continue;

      // part polygon
      if (part.circleRadius) {
        ctx.beginPath();
        ctx.arc(part.position.x, part.position.y, part.circleRadius, 0, 2 * Math.PI);
      } else {
        ctx.beginPath();
        ctx.moveTo(part.vertices[0].x, part.vertices[0].y);

        for (let j = 1; j < part.vertices.length; j++) {
          if (!part.vertices[j - 1].isInternal || showInternalEdges) {
            ctx.lineTo(part.vertices[j].x, part.vertices[j].y);
          } else {
            ctx.moveTo(part.vertices[j].x, part.vertices[j].y);
          }

          if (part.vertices[j].isInternal && !showInternalEdges) {
            ctx.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
          }
        }

        ctx.lineTo(part.vertices[0].x, part.vertices[0].y);
        ctx.closePath();
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = '#bbb';
      ctx.stroke();
    }
  });
};
