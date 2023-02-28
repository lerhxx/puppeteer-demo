const puppeteer = require('puppeteer');

const sleep = (time) => new Promise((resolve) => {
    setTimeout(resolve, time);
});

const login = async ({ email, pwd }) => {
    const browser = await puppeteer.launch({
      slowMo: 100, //放慢速度
      headless: false,
      defaultViewport: { width: 1000, height: 780 },
      ignoreHTTPSErrors: false, //忽略 https 报错
    });
    const page = await browser.newPage();
    await page.goto('https://business.oceanengine.com/site/organization');
    // 等待重定向
    await sleep(2000)
  
    // // 输入账号
    await page.type('input[name="email"]', email, { delay: 100 })
  
    // // 输入密码
    await page.type('input[name="password"]', pwd, { delay: 100 })

    // 同意协议
    const checkbox = await page.$('.account-center-agreement-check');
    await checkbox.click();
  
    // // 提交表单
    const btnConfirm = await page.$('.ace-ui-btn.account-center-action-button.active.ace-ui-btn-primary');
    await btnConfirm.click();
    // 等待加载图片验证码
    await sleep(5000)
    // 手动完成图片验证
    // 等待页面跳转完成
    await page.waitForNavigation();

    await sleep(3000);
    await page.close();
    await browser.close();
};
  
  (async () => {
    await login({ email: 'xxx', pwd: 'xxx' });
  })()