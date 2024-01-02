import { Logger } from './config/logger';
import Kernel from './kernel';
import logger from './utils/logger';

const PORT = Kernel.get('PORT');

Kernel.listen(Kernel.get('PORT'), () => {
  logger.info(`server is runing on PORT:${PORT}`);
});
