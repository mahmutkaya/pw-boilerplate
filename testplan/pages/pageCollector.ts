import log from '../../../helpers/logging/logging';

export const readPageCollector = async () => {
  let projectsPage = {};
  try {
    log.warn(`READING FILE`);
    // Run in container
    // Add PageCollector to channels
    // Add PageCollector here
    // We should add in allPages the reading of pageCollector per domain?
    const readChannelsRetailWebApp = async () => await import('./channels-retail-web-app/loginPage');

    const channelsRetailWebApp = await readChannelsRetailWebApp();

    projectsPage = {
      'channels-retail-web-app': channelsRetailWebApp,
    };

    log.warn(`FILE READ`);
  } catch (error) {
    log.error(`ERROR MESSAGE:${error}`);
  }
  return projectsPage;
};
