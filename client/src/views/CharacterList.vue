// All the card code is from https://codepen.io/nailaahmad/pen/LGRxWJ
<template>
    <div>
        <div class="cards">
            <div
                class="card"
                v-for="(person, idx) in getPeople"
                :key="person.created"
                :class="{
                    'is-collapsed': currentPersonIndex !== idx,
                    'is-expanded': currentPersonIndex === idx
                }"
            >
                <div
                    class="card__inner js-expander"
                    @click="onClickPerson(person.url, idx)"
                >
                    <span>{{ person.name }}</span>
                </div>
                <div class="card__expander">
                    <template v-if="currentPersonIndex === idx">
                        <span @click="cleanCurrentPersonIndex()"
                            ><i class="fa fa-close js-collapser"></i
                        ></span>
                        <v-row>
                            <v-col sm="4">
                                birth_year:
                                {{ getCurrentPerson.birth_year }}
                            </v-col>
                            <v-col sm="4">
                                eye_color: {{ getCurrentPerson.eye_color }}
                            </v-col>
                            <v-col sm="4">
                                gender: {{ getCurrentPerson.gender }}
                            </v-col>
                            <v-col sm="4">
                                hair_color: {{ getCurrentPerson.hair_color }}
                            </v-col>
                            <v-col sm="4">
                                height: {{ getCurrentPerson.height }}
                            </v-col>
                            <v-col sm="4">
                                mass: {{ getCurrentPerson.mass }}
                            </v-col>
                            <v-col sm="4">
                                films: {{ getCurrentPerson.films.length }}
                            </v-col>
                            <v-col sm="4">
                                species: {{ getCurrentPerson.species.length }}
                            </v-col>
                            <v-col sm="4">
                                starships:
                                {{ getCurrentPerson.starships.length }}
                            </v-col>
                            <v-col sm="4">
                                vehicles: {{ getCurrentPerson.vehicles.length }}
                            </v-col>
                        </v-row>
                    </template>
                </div>
            </div>
        </div>
        <infinite-loading @infinite="infiniteHandler">
            <div slot="spinner">
                <v-progress-circular
                    indeterminate
                    color="primary"
                ></v-progress-circular>
            </div>
            <div slot="no-more"></div>
            <div slot="no-results"></div>
        </infinite-loading>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Model } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import Axios, { AxiosResponse } from "axios";
import { flatten, concat, head, tail, map, compose, prop, equals } from "ramda";

import { actions, TPeople, IState } from "../store/people";
import { getLastFromArray, getValueOrDefault } from "../utils";

@Component({
    name: "PeopleList"
})
export default class PeopleList extends Vue {
    // Data
    currentPersonIndex = -1;

    // Vuex
    @State("people") people!: IState;
    @Action(actions.INIT_DATA) initData!: () => void;
    @Action(actions.INFINITE_HANDLER) infiniteHandler!: ($state: any) => void;
    @Action(actions.GET_PERSON_DETAIL) getPersonDetail!: (id: string) => void;
    @Action(actions.RESTART_CURRENT_PAGE) restartCurrentPage!: () => void;

    // Lifecycle
    async created() {
        await this.initData();
    }

    beforeDestroy() {
        this.restartCurrentPage();
    }

    //computed
    get getPeople() {
        return this.people.list;
    }

    get getCurrentPerson() {
        return this.people.current;
    }

    //methods
    getDetailItemPath(url: string) {
        return {
            name: "person-detail",
            params: {
                detailUrl: url
            }
        };
    }

    async handlerInfiniteScroll($state: any) {
        this.infiniteHandler($state);
    }

    async onClickPerson(url: string, idx: number) {
        if (equals(this.currentPersonIndex, idx))
            this.cleanCurrentPersonIndex();
        else {
            await this.getPersonDetail(url);
            this.currentPersonIndex = idx;
        }
    }

    cleanCurrentPersonIndex() {
        this.currentPersonIndex = -1;
    }
}
</script>
<style lang="scss" scoped>
$light-gray: #eceef1;
$gray: darken(#eceef1, 30%);
$slate: darken(#eceef1, 70%);
$turquoise: #1abc9c;
$dark: lighten(#000, 20%);
$banana: darken(#ffe81f, 12%);

/* Grid Container */
.cards {
    padding: 15px;
    display: flex;
    flex-flow: row wrap;
}

/* Cards */
.card {
    margin: 15px;
    width: calc((100% / 3) - 30px);
    transition: all 0.2s ease-in-out;

    /* media queries for stacking cards */
    @media screen and (max-width: 991px) {
        width: calc((100% / 2) - 30px);
    }

    @media screen and (max-width: 767px) {
        width: 100%;
    }

    &:hover {
        .card__inner {
            background-color: $banana;
            transform: scale(1.05);
            color: $dark;
        }
    }

    &__inner {
        width: 100%;
        padding: 30px;
        position: relative;
        cursor: pointer;

        background-color: $dark;
        color: $light-gray;
        font-size: 1.5em;
        text-transform: uppercase;
        text-align: center;

        transition: all 0.2s ease-in-out;

        &:after {
            transition: all 0.3s ease-in-out;
        }

        .fa {
            width: 100%;
            margin-top: 0.25em;
        }
    }

    /* Expander */
    &__expander {
        transition: all 0.3s ease-in-out;
        background-color: $slate;
        width: 100%;
        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;

        text-transform: uppercase;
        color: $light-gray;
        font-size: 1.5em;

        .fa {
            font-size: 0.75em;
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;

            &:hover {
                opacity: 0.9;
            }
        }
    }

    &.is-collapsed {
        .card__inner {
            &:after {
                content: "";
                opacity: 0;
            }
        }
        .card__expander {
            max-height: 0;
            min-height: 0;
            overflow: hidden;
            margin-top: 0;
            opacity: 0;
        }
    }

    &.is-expanded {
        .card__inner {
            background-color: $banana;

            &:after {
                content: "";
                opacity: 1;
                display: block;
                height: 0;
                width: 0;
                position: absolute;
                bottom: -30px;
                left: calc(50% - 15px);
                border-left: 15px solid transparent;
                border-right: 15px solid transparent;
                border-bottom: 15px solid #333a45;
            }

            /* folder open icon */
            .fa:before {
                content: "\f115";
            }
        }

        .card__expander {
            max-height: 1000px;
            min-height: 200px;
            overflow: visible;
            margin-top: 30px;
            opacity: 1;
        }

        &:hover {
            .card__inner {
                transform: scale(1);
            }
        }
    }
}

/* Expander Widths */

/* when 3 cards in a row */
@media screen and (min-width: 992px) {
    .card:nth-of-type(3n + 2) .card__expander {
        margin-left: calc(-100% - 30px);
    }
    .card:nth-of-type(3n + 3) .card__expander {
        margin-left: calc(-200% - 60px);
    }
    .card:nth-of-type(3n + 4) {
        clear: left;
    }
    .card__expander {
        width: calc(300% + 60px);
    }
}
</style>
