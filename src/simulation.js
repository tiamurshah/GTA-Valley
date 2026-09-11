export const WORLD_LIMIT = 294;
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
export const angleDelta = (a, b) => Math.atan2(Math.sin(b-a), Math.cos(b-a));
export const MISSIONS = [
  {title:'A little local business.',type:'COURIER RUN',description:'Pick up a saffron parcel at the lakeside market. There’s a whole valley waiting on the other side.',reward:750,time:150,stops:[{x:0,z:-48,label:'Collect the saffron parcel'},{x:-120,z:120,label:'Deliver to the old-town artisan'}]},
  {title:'The saffron connection.',type:'VALLEY DELIVERY',description:'A grower needs empty crates back in Pampore. Take the long road past the old town and into the purple fields.',reward:1100,time:160,stops:[{x:-120,z:120,label:'Collect crates in the old town'},{x:-120,z:240,label:'Deliver crates to the saffron grower'}]},
  {title:'The long way home.',type:'CHECKPOINT SPRINT',description:'Five checkpoints. One valley. Run the circuit from the saffron fields to the lakeside boulevard before the clock runs out.',reward:1800,time:125,stops:[{x:-240,z:240,label:'Reach the orchard turn'},{x:-240,z:0,label:'Pass the old-town gate'},{x:-120,z:-240,label:'Reach the mountain road'},{x:0,z:-240,label:'Pass the garden overlook'},{x:0,z:0,label:'Finish on the boulevard'}]}
];
export function waterAt(x,z){return x>30 && z< -31;}
export function roadAt(x,z){return [0,-120,-240].some(v=>Math.abs(x-v)<10)||[0,120,240,-120,-240].some(v=>Math.abs(z-v)<10)&&x<20 || z>20&&[120,240].some(v=>Math.abs(x-v)<10);}
export function blocked(x,z,r,obstacles){if(Math.abs(x)>WORLD_LIMIT-r||Math.abs(z)>WORLD_LIMIT-r||waterAt(x+r,z-r))return true;return obstacles.some(o=>x+r>o.x-o.w/2&&x-r<o.x+o.w/2&&z+r>o.z-o.d/2&&z-r<o.z+o.d/2);}
export function stepVehicle(car,input,dt,obstacles){
  const oldSpeed=car.speed;
  const top=roadAt(car.x,car.z)?35:17;
  car.speed+=input.throttle*21*dt;
  car.speed*=Math.exp(-(input.brake?6:input.throttle?0.34:1.15)*dt);
  car.speed=clamp(car.speed,-11,top);
  if(Math.abs(car.speed)<.04)car.speed=0;
  car.angle-=input.steer*1.65*clamp(car.speed/10,-1,1)*dt*(input.brake?1.7:1);
  const nx=car.x+Math.sin(car.angle)*car.speed*dt,nz=car.z+Math.cos(car.angle)*car.speed*dt;
  let collided=false;
  if(!blocked(nx,nz,1.8,obstacles)){car.x=nx;car.z=nz;}else{car.speed=-oldSpeed*.22;collided=Math.abs(oldSpeed)>4;}
  return {collided,impact:Math.abs(oldSpeed)};
}
export function missionTick(run,player,dt){
  if(!run.active)return null;
  run.remaining-=dt;
  if(run.remaining<=0){run.active=false;return 'failed';}
  if(distance(player,MISSIONS[run.index].stops[run.stop])<10){run.stop++;if(run.stop===MISSIONS[run.index].stops.length){run.active=false;return 'complete';}return 'checkpoint';}
  return null;
}
export function safeLoad(storage){try{const v=JSON.parse(storage.getItem('valley-run-save')||'{}');return {cash:clamp(Number(v.cash)||0,0,9999999),completed:Array.isArray(v.completed)?v.completed.filter(n=>Number.isInteger(n)&&n>=0&&n<MISSIONS.length):[],quality:['auto','low','high'].includes(v.quality)?v.quality:'auto'};}catch{return {cash:0,completed:[],quality:'auto'};}}
