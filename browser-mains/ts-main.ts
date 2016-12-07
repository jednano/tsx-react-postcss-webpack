import { noop } from 'lodash';

import '../styles/sheets/global';
import '../styles/sheets/ts';

import TsBundle from '../components/TypeScript';
import bootstrapBrowserApp from './utilities/bootstrap-browser-app';

bootstrapBrowserApp(TsBundle, noop);
