'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">air-tickets-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AirlinesModule.html" data-type="entity-link">AirlinesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AirlinesModule-27081d0ed902ea370a945c694c492b76"' : 'data-target="#xs-controllers-links-module-AirlinesModule-27081d0ed902ea370a945c694c492b76"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AirlinesModule-27081d0ed902ea370a945c694c492b76"' :
                                            'id="xs-controllers-links-module-AirlinesModule-27081d0ed902ea370a945c694c492b76"' }>
                                            <li class="link">
                                                <a href="controllers/AirlinesController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AirlinesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AirlinesModule-27081d0ed902ea370a945c694c492b76"' : 'data-target="#xs-injectables-links-module-AirlinesModule-27081d0ed902ea370a945c694c492b76"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AirlinesModule-27081d0ed902ea370a945c694c492b76"' :
                                        'id="xs-injectables-links-module-AirlinesModule-27081d0ed902ea370a945c694c492b76"' }>
                                        <li class="link">
                                            <a href="injectables/AirlinesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AirlinesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AirplanesModule.html" data-type="entity-link">AirplanesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AirplanesModule-8b7d4d7cd012feaf9aaf4f56f07e3252"' : 'data-target="#xs-controllers-links-module-AirplanesModule-8b7d4d7cd012feaf9aaf4f56f07e3252"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AirplanesModule-8b7d4d7cd012feaf9aaf4f56f07e3252"' :
                                            'id="xs-controllers-links-module-AirplanesModule-8b7d4d7cd012feaf9aaf4f56f07e3252"' }>
                                            <li class="link">
                                                <a href="controllers/AirplanesController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AirplanesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AirplanesModule-8b7d4d7cd012feaf9aaf4f56f07e3252"' : 'data-target="#xs-injectables-links-module-AirplanesModule-8b7d4d7cd012feaf9aaf4f56f07e3252"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AirplanesModule-8b7d4d7cd012feaf9aaf4f56f07e3252"' :
                                        'id="xs-injectables-links-module-AirplanesModule-8b7d4d7cd012feaf9aaf4f56f07e3252"' }>
                                        <li class="link">
                                            <a href="injectables/AirplanesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AirplanesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AirportsModule.html" data-type="entity-link">AirportsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AirportsModule-6d2190ec22f3f11083c67c813fa7db56"' : 'data-target="#xs-controllers-links-module-AirportsModule-6d2190ec22f3f11083c67c813fa7db56"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AirportsModule-6d2190ec22f3f11083c67c813fa7db56"' :
                                            'id="xs-controllers-links-module-AirportsModule-6d2190ec22f3f11083c67c813fa7db56"' }>
                                            <li class="link">
                                                <a href="controllers/AirportsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AirportsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AirportsModule-6d2190ec22f3f11083c67c813fa7db56"' : 'data-target="#xs-injectables-links-module-AirportsModule-6d2190ec22f3f11083c67c813fa7db56"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AirportsModule-6d2190ec22f3f11083c67c813fa7db56"' :
                                        'id="xs-injectables-links-module-AirportsModule-6d2190ec22f3f11083c67c813fa7db56"' }>
                                        <li class="link">
                                            <a href="injectables/AirportsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AirportsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-c650d33a25a0b50242deffcdbcab7ec0"' : 'data-target="#xs-controllers-links-module-AppModule-c650d33a25a0b50242deffcdbcab7ec0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-c650d33a25a0b50242deffcdbcab7ec0"' :
                                            'id="xs-controllers-links-module-AppModule-c650d33a25a0b50242deffcdbcab7ec0"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-c650d33a25a0b50242deffcdbcab7ec0"' : 'data-target="#xs-injectables-links-module-AppModule-c650d33a25a0b50242deffcdbcab7ec0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c650d33a25a0b50242deffcdbcab7ec0"' :
                                        'id="xs-injectables-links-module-AppModule-c650d33a25a0b50242deffcdbcab7ec0"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-f6eaa55ef6e4fc4fa68862ebbc9296e9"' : 'data-target="#xs-controllers-links-module-AuthModule-f6eaa55ef6e4fc4fa68862ebbc9296e9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-f6eaa55ef6e4fc4fa68862ebbc9296e9"' :
                                            'id="xs-controllers-links-module-AuthModule-f6eaa55ef6e4fc4fa68862ebbc9296e9"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-f6eaa55ef6e4fc4fa68862ebbc9296e9"' : 'data-target="#xs-injectables-links-module-AuthModule-f6eaa55ef6e4fc4fa68862ebbc9296e9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-f6eaa55ef6e4fc4fa68862ebbc9296e9"' :
                                        'id="xs-injectables-links-module-AuthModule-f6eaa55ef6e4fc4fa68862ebbc9296e9"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link">FilesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FilesModule-9097ec33fa513780956e669492e77902"' : 'data-target="#xs-injectables-links-module-FilesModule-9097ec33fa513780956e669492e77902"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-9097ec33fa513780956e669492e77902"' :
                                        'id="xs-injectables-links-module-FilesModule-9097ec33fa513780956e669492e77902"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FlightsModule.html" data-type="entity-link">FlightsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FlightsModule-aef29b48e4a6b15848f97b64e36255eb"' : 'data-target="#xs-controllers-links-module-FlightsModule-aef29b48e4a6b15848f97b64e36255eb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FlightsModule-aef29b48e4a6b15848f97b64e36255eb"' :
                                            'id="xs-controllers-links-module-FlightsModule-aef29b48e4a6b15848f97b64e36255eb"' }>
                                            <li class="link">
                                                <a href="controllers/FlightsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FlightsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FlightsModule-aef29b48e4a6b15848f97b64e36255eb"' : 'data-target="#xs-injectables-links-module-FlightsModule-aef29b48e4a6b15848f97b64e36255eb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FlightsModule-aef29b48e4a6b15848f97b64e36255eb"' :
                                        'id="xs-injectables-links-module-FlightsModule-aef29b48e4a6b15848f97b64e36255eb"' }>
                                        <li class="link">
                                            <a href="injectables/FlightsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FlightsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SeatsModule.html" data-type="entity-link">SeatsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SeatsModule-0f5309aebd5b0e98b744f389d44c0e07"' : 'data-target="#xs-controllers-links-module-SeatsModule-0f5309aebd5b0e98b744f389d44c0e07"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SeatsModule-0f5309aebd5b0e98b744f389d44c0e07"' :
                                            'id="xs-controllers-links-module-SeatsModule-0f5309aebd5b0e98b744f389d44c0e07"' }>
                                            <li class="link">
                                                <a href="controllers/SeatsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SeatsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SeatsModule-0f5309aebd5b0e98b744f389d44c0e07"' : 'data-target="#xs-injectables-links-module-SeatsModule-0f5309aebd5b0e98b744f389d44c0e07"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SeatsModule-0f5309aebd5b0e98b744f389d44c0e07"' :
                                        'id="xs-injectables-links-module-SeatsModule-0f5309aebd5b0e98b744f389d44c0e07"' }>
                                        <li class="link">
                                            <a href="injectables/SeatsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SeatsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SectionsModule.html" data-type="entity-link">SectionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SectionsModule-210a6cb17535d107b036504bd8102d2a"' : 'data-target="#xs-controllers-links-module-SectionsModule-210a6cb17535d107b036504bd8102d2a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SectionsModule-210a6cb17535d107b036504bd8102d2a"' :
                                            'id="xs-controllers-links-module-SectionsModule-210a6cb17535d107b036504bd8102d2a"' }>
                                            <li class="link">
                                                <a href="controllers/SectionsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SectionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SectionsModule-210a6cb17535d107b036504bd8102d2a"' : 'data-target="#xs-injectables-links-module-SectionsModule-210a6cb17535d107b036504bd8102d2a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SectionsModule-210a6cb17535d107b036504bd8102d2a"' :
                                        'id="xs-injectables-links-module-SectionsModule-210a6cb17535d107b036504bd8102d2a"' }>
                                        <li class="link">
                                            <a href="injectables/SectionsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SectionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TicketsModule.html" data-type="entity-link">TicketsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TicketsModule-d2673050a0042b1f7cf1814f150b70a2"' : 'data-target="#xs-controllers-links-module-TicketsModule-d2673050a0042b1f7cf1814f150b70a2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TicketsModule-d2673050a0042b1f7cf1814f150b70a2"' :
                                            'id="xs-controllers-links-module-TicketsModule-d2673050a0042b1f7cf1814f150b70a2"' }>
                                            <li class="link">
                                                <a href="controllers/TicketsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TicketsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TicketsModule-d2673050a0042b1f7cf1814f150b70a2"' : 'data-target="#xs-injectables-links-module-TicketsModule-d2673050a0042b1f7cf1814f150b70a2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TicketsModule-d2673050a0042b1f7cf1814f150b70a2"' :
                                        'id="xs-injectables-links-module-TicketsModule-d2673050a0042b1f7cf1814f150b70a2"' }>
                                        <li class="link">
                                            <a href="injectables/TicketsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TicketsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link">UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-91d8279e2c1efd6700b9aeae88de58ea"' : 'data-target="#xs-controllers-links-module-UsersModule-91d8279e2c1efd6700b9aeae88de58ea"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-91d8279e2c1efd6700b9aeae88de58ea"' :
                                            'id="xs-controllers-links-module-UsersModule-91d8279e2c1efd6700b9aeae88de58ea"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-91d8279e2c1efd6700b9aeae88de58ea"' : 'data-target="#xs-injectables-links-module-UsersModule-91d8279e2c1efd6700b9aeae88de58ea"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-91d8279e2c1efd6700b9aeae88de58ea"' :
                                        'id="xs-injectables-links-module-UsersModule-91d8279e2c1efd6700b9aeae88de58ea"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AirlinesController.html" data-type="entity-link">AirlinesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AirplanesController.html" data-type="entity-link">AirplanesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AirportsController.html" data-type="entity-link">AirportsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link">AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link">AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FlightsController.html" data-type="entity-link">FlightsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SeatsController.html" data-type="entity-link">SeatsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SectionsController.html" data-type="entity-link">SectionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TicketsController.html" data-type="entity-link">TicketsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link">UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Airline.html" data-type="entity-link">Airline</a>
                            </li>
                            <li class="link">
                                <a href="classes/Airplane.html" data-type="entity-link">Airplane</a>
                            </li>
                            <li class="link">
                                <a href="classes/Airport.html" data-type="entity-link">Airport</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeUserPasswordDto.html" data-type="entity-link">ChangeUserPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAirlineDto.html" data-type="entity-link">CreateAirlineDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAirplaneDto.html" data-type="entity-link">CreateAirplaneDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAirportDto.html" data-type="entity-link">CreateAirportDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFlightDto.html" data-type="entity-link">CreateFlightDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSeatDto.html" data-type="entity-link">CreateSeatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSectionDto.html" data-type="entity-link">CreateSectionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTicketDto.html" data-type="entity-link">CreateTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link">CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Flight.html" data-type="entity-link">Flight</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link">LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchFlightByRangeDto.html" data-type="entity-link">SearchFlightByRangeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchFlightDto.html" data-type="entity-link">SearchFlightDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Seat.html" data-type="entity-link">Seat</a>
                            </li>
                            <li class="link">
                                <a href="classes/Section.html" data-type="entity-link">Section</a>
                            </li>
                            <li class="link">
                                <a href="classes/SelectSeatDto.html" data-type="entity-link">SelectSeatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ticket.html" data-type="entity-link">Ticket</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAirlineDto.html" data-type="entity-link">UpdateAirlineDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAirplaneDto.html" data-type="entity-link">UpdateAirplaneDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAirportDto.html" data-type="entity-link">UpdateAirportDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFlightDto.html" data-type="entity-link">UpdateFlightDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSeatDto.html" data-type="entity-link">UpdateSeatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSectionDto.html" data-type="entity-link">UpdateSectionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTicketDto.html" data-type="entity-link">UpdateTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDataDto.html" data-type="entity-link">UpdateUserDataDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AirlinesService.html" data-type="entity-link">AirlinesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AirplanesService.html" data-type="entity-link">AirplanesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AirportsService.html" data-type="entity-link">AirportsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link">AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link">FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FlightsService.html" data-type="entity-link">FlightsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link">JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link">JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link">LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link">LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SeatsService.html" data-type="entity-link">SeatsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SectionsService.html" data-type="entity-link">SectionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TicketsService.html" data-type="entity-link">TicketsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link">UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link">RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});