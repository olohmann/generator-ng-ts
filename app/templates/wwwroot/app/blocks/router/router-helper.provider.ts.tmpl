module Blocks.Router {
    'use strict';

    export interface IStateCounts {
        errors: number;
        changes: number;
    }

    export interface IStateConfig {
        state: string;
        config: angular.ui.IState;
    }

    export interface IRouterHelper {
        configureStates(states: Array<IStateConfig>): void;
        configureStates(states: Array<IStateConfig>, otherwiseState: string): void;
        getStates(): angular.ui.IState[];
        stateCounts: IStateCounts;
    }

    export interface IRouterHelperProviderConfig {
        docTitle: string;
        resolveAlways: any;
    }

    export class RouterHelperProvider implements angular.IServiceProvider {
        private config: IRouterHelperProviderConfig;
        static $inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

        constructor(
            private $locationProvider: angular.ILocationProvider,
            private $stateProvider: angular.ui.IStateProvider,
            private $urlRouterProvider: angular.ui.IUrlRouterProvider) {

            this.config = {
                docTitle: '',
                resolveAlways: {}
            };

            this.$locationProvider.html5Mode(false);
            this.$get.$inject = ['$location', '$rootScope', '$state', 'logger'];
        }

        public configure(cfg: any) {
            angular.extend(this.config, cfg);
        }

        public $get(
            $location: angular.ILocationService,
            $rootScope: angular.IRootScopeService,
            $state: angular.ui.IStateService,
            logger: Blocks.Log.Logger): IRouterHelper {
            var $stateProvider = this.$stateProvider;
            var $locationProvider = this.$locationProvider;
            var $urlRouterProvider = this.$urlRouterProvider;
            var config = this.config;

            var handlingStateChangeError = false;
            var hasOtherwise = false;

            var stateCounts = {
                errors: 0,
                changes: 0
            };

            var service = {
                configureStates: configureStates,
                getStates: getStates,
                stateCounts: stateCounts
            };

            init();

            return service;

            function init(): void {
                handleRoutingErrors();
                updateDocTitle();
            }

            function configureStates(states: Array<IStateConfig>, otherwiseState?: string): void {
                // Remap root calls, i.e. http://example.org/ --> http://example.org/#/
                $urlRouterProvider.when('', '/');

                states.forEach(function(state) {
                    state.config.resolve =
                    angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });

                if (otherwiseState && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(
                        ($injector: angular.auto.IInjectorService, $location: any) => {
                            var href = $state.href(otherwiseState,
                                {
                                    origin: $location.$$url
                                });

                            // Remove the leading hash, otherwise ui-router gets confused.
                            if (href.indexOf('#') === 0) {
                                return href.substr(1, href.length);
                            } else {
                                return href;
                            }
                        });
                }
            }

            function handleRoutingErrors(): void {
                // Route cancellation:
                // On routing error, go to the dashboard.
                // Provide an exit clause if it tries to do it twice.
                $rootScope.$on('$stateChangeError',
                    function(event, toState, toParams, fromState, fromParams, error) {
                        if (handlingStateChangeError) {
                            return;
                        }
                        stateCounts.errors++;
                        handlingStateChangeError = true;
                        var destination = (toState &&
                            (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                            'unknown target';
                        var msg = 'Error routing to ' + destination + '. ' +
                            (error.data || '') + '. <br/>' + (error.statusText || '') +
                            ': ' + (error.status || '');
                        logger.warning(msg, [toState], '');
                        $location.path('/');
                    }
                    );
            }

            function getStates(): angular.ui.IState[] {
                return $state.get();
            }

            function updateDocTitle(): void {
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams) {
                        stateCounts.changes++;
                        handlingStateChangeError = false;
                        var title = config.docTitle + ' ' + (toState.title || '');
                        (<any>$rootScope).title = title; // data bind to <title>
                    }
                    );
            }
        }
    }

    angular
        .module('blocks.router')
        .provider('routerHelper', RouterHelperProvider);
}
