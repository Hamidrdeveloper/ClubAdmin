const fs = require('fs');
const path = require('path');

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.minimize = function () {
  return this.charAt(0).toLowerCase() + this.slice(1);
};

let mainLayout = (imports, routes) => `
import SiteLayout from '@src/core/Layout/SiteLayout';
import React, { ReactElement, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

${imports}
export default function AdminRoutes(): ReactElement {
  
  return (
    <SiteLayout>
      <Routes>
${routes}      </Routes>
    </SiteLayout>
  );
}
`;
const modulesDir = path.join(__dirname, '../src/modules');
const adminRoutesDir = path.join(__dirname, '../src/modules');

fs.readdir(modulesDir, { withFileTypes: true }, (err, files) => {
  let routesImport = '';
  let modulesImport = '';

  files
    .filter((dirent) => dirent.isDirectory())
    .map((file) => {
      if (fs.existsSync(path.join(modulesDir, `${file.name}/pages/index.tsx`))) {
        const innerDir = path.join(modulesDir, `${file.name}/ModuleInfo.json`);

        fs.readFile(innerDir, 'utf8', async (err, data) => {
          if (data) {
            const module = await JSON.parse(data);
            const component = `${module.Title}Page`;
            routesImport += getRoute(module.Route, component);
            modulesImport += getModuleEntry(component, module.Entry);
          }

          fs.writeFileSync(`${adminRoutesDir}/Router.tsx`, mainLayout(modulesImport, routesImport));
        });
      }
    });
});

const getModuleEntry = (name, entry) => `const ${name} = lazy(() => import('${entry}'));\n`;
const getRoute = (name, component) =>
  '        <' + 'Route path={`' + name + '`} element={<' + component + ' />}' + ' />\n';
