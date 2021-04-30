const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;
const Bounds = Matter.Bounds;
const Common = Matter.Common;

const engine = Engine.create();
const runner = Runner.create();

// Fixed Random Seed [DEV]
Common._seed = 42;
