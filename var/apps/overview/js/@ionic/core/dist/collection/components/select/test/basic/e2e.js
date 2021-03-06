import { newE2EPage } from '@stencil/core/testing';
test.skip('select: basic', async () => {
    const page = await newE2EPage({
        url: '/src/components/select/test/basic?ionic:_testing=true'
    });
    const compares = [];
    compares.push(await page.compareScreenshot());
    let select = await page.find('#gender');
    await select.click();
    let alert = await page.find('ion-alert');
    await alert.waitForVisible();
    await page.waitFor(250);
    compares.push(await page.compareScreenshot('should open gender single select'));
    await alert.callMethod('dismiss');
    select = await page.find('#skittles');
    await select.click();
    let actionSheet = await page.find('ion-action-sheet');
    await actionSheet.waitForVisible();
    await page.waitFor(250);
    compares.push(await page.compareScreenshot('should open skittles action sheet select'));
    await actionSheet.callMethod('dismiss');
    select = await page.find('#customAlertSelect');
    await select.click();
    alert = await page.find('ion-alert');
    await alert.waitForVisible();
    await page.waitFor(250);
    compares.push(await page.compareScreenshot('should open custom alert select'));
    await alert.callMethod('dismiss');
    select = await page.find('#customPopoverSelect');
    await select.click();
    const popover = await page.find('ion-popover');
    await popover.waitForVisible();
    await page.waitFor(250);
    compares.push(await page.compareScreenshot('should open custom popover select'));
    select = await page.find('#customActionSheetSelect');
    await select.click();
    actionSheet = await page.find('ion-action-sheet');
    await actionSheet.waitForVisible();
    await page.waitFor(250);
    compares.push(await page.compareScreenshot('should open custom action sheet select'));
    await actionSheet.callMethod('dismiss');
    for (const compare of compares) {
        expect(compare).toMatchScreenshot();
    }
});
