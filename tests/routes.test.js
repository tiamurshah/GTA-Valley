import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createWorld} from '../src/world.js';
import {MISSIONS,stepVehicle,distance,angleDelta,clamp,missionTick} from '../src/simulation.js';
test('all jobs are driveable on the generated map within their time limits',()=>{
 const world=createWorld(new THREE.Scene());
 const paths=[
  [{x:0,z:-48},{x:0,z:0},{x:-120,z:0},{x:-120,z:120}],
  [{x:0,z:0},{x:-120,z:0},{x:-120,z:120},{x:-120,z:240}],
  [{x:0,z:0},{x:0,z:240},{x:-240,z:240},{x:-240,z:0},{x:-240,z:-240},{x:-120,z:-240},{x:0,z:-240},{x:0,z:0}]
 ];
 for(let i=0;i<MISSIONS.length;i++){
  const c={x:0,z:-8,angle:Math.PI,speed:0};let wp=0,elapsed=0,complete=false,impacts=0;
  const run={index:i,stop:0,remaining:MISSIONS[i].time,active:true};
  while(elapsed<MISSIONS[i].time&&wp<paths[i].length){
   const target=paths[i][wp],d=distance(c,target),a=angleDelta(c.angle,Math.atan2(target.x-c.x,target.z-c.z));
   const desired=Math.abs(a)>.35?6:Math.min(29,Math.max(6,d*.6));
   const input={throttle:c.speed<desired?1:0,steer:clamp(-a*3,-1,1),brake:c.speed>desired+1};
   const result=stepVehicle(c,input,1/60,world.obstacles);if(result.collided)impacts++;
   const outcome=missionTick(run,c,1/60);if(outcome==='complete'){complete=true;break;}
   if(d<7)wp++;elapsed+=1/60;
  }
  assert.ok(complete,`Mission ${i+1}: incomplete after ${elapsed.toFixed(1)}s at ${c.x.toFixed(1)},${c.z.toFixed(1)}; waypoint ${wp}, impacts ${impacts}`);
  assert.equal(impacts,0,`Mission ${i+1} should have a collision-free route`);
 }
});
