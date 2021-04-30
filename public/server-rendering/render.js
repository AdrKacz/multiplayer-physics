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

function renderWorld(world) {
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillRect(0, 0, width, height);

  world.forEach((body, i) => {
    if (!body.render.visible) {
      return;
    };
    // DO NOT handle compound bodys

    // polygon
    if (body.circleRadius) {
      ctx.beginPath();
      ctx.arc(body.position.x, body.position.y, body.circleRadius, 0, 2 * Math.PI);
    } else {
      ctx.beginPath();
      ctx.moveTo(body.vertices[0].x, body.vertices[0].y);

      for (let j = 1; j < body.vertices.length; j++) {
        if (!body.vertices[j - 1].isInternal || showInternalEdges) {
          ctx.lineTo(body.vertices[j].x, body.vertices[j].y);
        } else {
          ctx.moveTo(body.vertices[j].x, body.vertices[j].y);
        }

        if (body.vertices[j].isInternal && !showInternalEdges) {
          ctx.moveTo(body.vertices[(j + 1) % body.vertices.length].x, body.vertices[(j + 1) % body.vertices.length].y);
        }
      }

      ctx.lineTo(body.vertices[0].x, body.vertices[0].y);
      ctx.closePath();
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#bbb';
    ctx.stroke();
  });
};
