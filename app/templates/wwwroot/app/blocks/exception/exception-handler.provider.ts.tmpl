module Blocks.Exception {
    'use strict';

    export interface IExceptionHandler {
        config : { appErrorPrefix:string };
    }

    class ExceptionHandlerProvider {
        private config : {appErrorPrefix:string};
        constructor() {

            this.config = {
                appErrorPrefix: ''
            };
        }

        configure(appErrorPrefix : string) {
            this.config.appErrorPrefix = appErrorPrefix;
        }

        $get() : IExceptionHandler {
            return { config: this.config };
        }
    }

    config.$inject = ['$provide'];

    /**
     * Configure by setting an optional string value for appErrorPrefix.
     * Accessible via config.appErrorPrefix (via config value).
     * @param  {[type]} $provide
     * @return {[type]}
     * @ngInject
     */
    function config($provide : angular.auto.IProvideService) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    extendExceptionHandler.$inject = ['$delegate', 'exceptionHandler', 'logger'];

    /**
     * Extend the $exceptionHandler service to also display a toast.
     * @param  {Object} $delegate
     * @param  {Object} exceptionHandler
     * @param  {Object} logger
     * @return {Function} the decorated $exceptionHandler service
     */
    function extendExceptionHandler(
        $delegate : any,
        exceptionHandler : IExceptionHandler,
        logger : Blocks.Log.Logger) {

        return function(exception : any, cause : any) {
            var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
            var errorData = {exception: exception, cause: cause};
            exception.message = appErrorPrefix + exception.message;
            $delegate(exception, cause);
            /**
             * Could add the error to a service's collection,
             * add errors to $rootScope, log errors to remote web server,
             * or log locally. Or throw hard. It is entirely up to you.
             * throw exception;
             *
             * @example
             *     throw { message: 'error message we added' };
             */
            logger.error(exception.message, errorData, '');
        };
    }

    angular
       .module('blocks.exception')
       .provider('exceptionHandler', ExceptionHandlerProvider)
       .config(config);
}
