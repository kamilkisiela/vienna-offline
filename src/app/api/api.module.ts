import { NgModule, InjectionToken, Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as merge from 'lodash.merge';
import * as flatten from 'lodash.flatten';
// Apollo
import { ApolloLink } from 'apollo-link';
import { ApolloModule, Apollo } from 'apollo-angular';
// Links
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
// import OptimisticLink from 'apollo-link-optimistic';
import SerializingLink from 'apollo-link-serialize';
import QueueLink from 'apollo-link-queue';
import { withClientState } from 'apollo-link-state';
import { RetryLink } from 'apollo-link-retry';
import OptimisticLink from './optimistic-link';
// Cache
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

const uri = 'http://localhost:3000/graphql';

export interface State {
  resolvers: any;
  defaults?: any;
  typeDefs?: string | string[];
}

export const ApolloGate = new InjectionToken<QueueLink>('apollo-gate');
export const State = new InjectionToken<State[]>('apollo-link-state');

export function createApolloGate() {
  return new QueueLink();
}

@NgModule({
  imports: [CommonModule, HttpClientModule, HttpLinkModule, ApolloModule],
  providers: [{ provide: ApolloGate, useFactory: createApolloGate }],
  declarations: [],
})
export class ApiModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    @Inject(ApolloGate) gate: QueueLink,
    @Inject(State) states: State[],
  ) {
    const cache = new InMemoryCache();
    const optimistic = new OptimisticLink();
    const serializing = new SerializingLink();
    const retry = new RetryLink({
      delay: count => Math.min(300 * 2 ** count, 10000),
      attempts: {
        max: Number.POSITIVE_INFINITY,
      },
    });
    const clientState = withClientState({ cache, ...this.mergeStates(states) });
    console.log('sss', { ...this.mergeStates(states) });
    const http = httpLink.create({ uri });

    persistCache({
      cache,
      storage: sessionStorage,
      key: 'keep-app',
      debug: true,
      debounce: 300,
    });

    const link = ApolloLink.from([
      optimistic as any, // doesn't work...
      serializing,
      clientState,
      retry,
      gate,
      http,
    ]);

    apollo.create({
      cache,
      link,
    });
  }

  private mergeStates(states: State[]): State {
    return {
      resolvers: merge(...states.map(state => state.resolvers)),
      defaults: merge(...states.map(state => state.defaults)),
      typeDefs: flatten(states.map(state => state.typeDefs)) as string[],
    };
  }
}
