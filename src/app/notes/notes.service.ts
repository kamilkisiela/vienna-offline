import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Note, NoteInput, noteFragment } from './models/note';

const select = (name: string) => (source: Observable<any>) =>
  source.pipe(map((result: any) => result.data && result.data[name]));

const allQuery = gql`
  {
    notes {
      ...noteFragment
    }
  }
  ${noteFragment}
`;

const singleQuery = gql`
  query note($id: String!) {
    note(id: $id) {
      ...noteFragment
    }
  }
  ${noteFragment}
`;

const addMutation = gql`
  mutation add($input: NoteInput!) {
    add(input: $input) {
      ...noteFragment
    }
  }

  ${noteFragment}
`;

const updateMutation = gql`
  mutation update($id: String!, $input: NoteInput!) {
    update(id: $id, input: $input) {
      ...noteFragment
    }
  }

  ${noteFragment}
`;

const removeMutation = gql`
  mutation remove($id: String!) {
    remove(id: $id) {
      ...noteFragment
    }
  }

  ${noteFragment}
`;

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private apollo: Apollo) {}

  all(): Observable<Note[]> {
    return this.apollo
      .watchQuery({
        query: allQuery,
        fetchPolicy: 'cache-and-network',
      })
      .valueChanges.pipe(select('notes'));
  }

  single(id: string): Observable<Note> {
    return this.apollo
      .watchQuery({
        query: singleQuery,
        variables: {
          id,
        },
        fetchPolicy: 'cache-and-network',
      })
      .valueChanges.pipe(select('note'));
  }

  add(input: NoteInput): Observable<Note> {
    const optimistic = {
      data: {
        add: {
          id: `temp-${Math.random()
            .toString(36)
            .substr(2)}`,
          ...input,
          __typename: 'Note',
        },
      },
    };

    return this.apollo
      .mutate({
        mutation: addMutation,
        variables: {
          input,
        },
        // context: {
        //   optimistic,
        // },
        optimisticResponse: optimistic.data,
        update: (proxy, result) => {
          const data: any = proxy.readQuery({ query: allQuery });

          proxy.writeQuery({
            query: allQuery,
            data: {
              ...data,
              notes: [result.data.add, ...data.notes],
            },
          });
        },
      })
      .pipe(select('add'));
  }

  update(id: string, input: NoteInput): Observable<Note> {
    return this.apollo
      .mutate({
        mutation: updateMutation,
        variables: {
          id,
          input,
        },
        context: { serializationKey: `update:${id}` },
      })
      .pipe(select('update'));
  }

  remove(id: string): Observable<Note> {
    return this.apollo
      .mutate({
        mutation: removeMutation,
        variables: {
          id,
        },
        context: { serializationKey: `remove:${id}` },
        update: (proxy, result) => {
          const data: any = proxy.readQuery({ query: allQuery });

          proxy.writeQuery({
            query: allQuery,
            data: {
              ...data,
              notes: data.notes.filter(note => note.id !== id),
            },
          });
        },
      })
      .pipe(select('remove'));
  }
}
