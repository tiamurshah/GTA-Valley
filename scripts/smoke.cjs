const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const fs=require('fs');
const assert=require('node:assert/strict');
(async()=>{
 fs.mkdirSync('test-results',{recursive:true});
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1440,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.GAME_URL||'http://localhost:5173');await page.waitForFunction(()=>window.__valleyDebug);await page.screenshot({path:'test-results/desktop.png'});
 const initial=await page.evaluate(()=>window.__valleyDebug());console.log('INITIAL',initial);
 await page.locator('#start-mission').click();await page.keyboard.down('KeyW');await page.waitForTimeout(2700);await page.keyboard.up('KeyW');await page.keyboard.down('Space');await page.waitForTimeout(1200);await page.keyboard.up('Space');
 const driven=await page.evaluate(()=>window.__valleyDebug());assert.ok(driven.player.z<initial.player.z-10,'Forward motion');console.log('DRIVEN',driven);
 await page.keyboard.press('KeyE');assert.equal(await page.evaluate(()=>window.__valleyDebug().walking),true);await page.keyboard.press('KeyE');assert.equal(await page.evaluate(()=>window.__valleyDebug().walking),false);
 await page.locator('#pause').click();const frozen=await page.evaluate(()=>window.__valleyDebug().mission.remaining);await page.waitForTimeout(250);assert.equal(await page.evaluate(()=>window.__valleyDebug().mission.remaining),frozen);await page.locator('#recover').click();
 await page.locator('#map-expand').click();assert.ok(await page.locator('#large-map').isVisible());await page.locator('.close').click();await page.locator('#help').click();assert.ok(await page.getByText('Rooted in Kashmir.').isVisible());await page.locator('.close').click();
 await page.locator('#mission-toggle').click();await page.locator('[data-job="1"]').click();assert.equal(await page.evaluate(()=>window.__valleyDebug().mission.index),1);await page.locator('#pause').click();await page.locator('#recover').click();
 const mobile=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});await mobile.goto(process.env.GAME_URL||'http://localhost:5173');await mobile.waitForFunction(()=>window.__valleyDebug);await mobile.screenshot({path:'test-results/mobile-portrait.png'});assert.ok(await mobile.locator('#joystick').isVisible());
 const rect=await mobile.locator('#joystick').boundingBox();await mobile.mouse.move(rect.x+rect.width/2,rect.y+rect.height/2);await mobile.mouse.down();await mobile.mouse.move(rect.x+rect.width/2,rect.y+12);await mobile.waitForTimeout(1400);await mobile.mouse.up();assert.ok(await mobile.evaluate(()=>window.__valleyDebug().speed)>1,'Joystick accelerates');
 await mobile.setViewportSize({width:844,height:390});await mobile.screenshot({path:'test-results/mobile-landscape.png'});console.log('MOBILE',await mobile.evaluate(()=>window.__valleyDebug()));assert.deepEqual(errors,[]);console.log('Browser smoke checks passed.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
