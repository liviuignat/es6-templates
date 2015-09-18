const CONFIG = {
  development: {
    APP_CONFIG: {
      apiUrl: '//localhost:3000/api'
    }
  },
  integration: {
    APP_CONFIG: {
      apiUrl: '//cube.rs-int.sachit.intern/api'
    }
  },
  qa: {
    APP_CONFIG: {
      apiUrl: '//cube.rs-qa.sachit.intern/api'
    }
  },
  production: {
    APP_CONFIG: {
      apiUrl: '//cube.rs-prod.sachit.intern/api'
    }
  }
};

class Config {
  getEnvironment() {
    return window.env || 'development';
  }

  getConfig() {
    const defaultConfig = CONFIG['development'];
    const config = CONFIG[this.getEnvironment()];

    return config || defaultConfig;
  }
}

export default {
  CONFIG,
  config: new Config().getConfig()
};
