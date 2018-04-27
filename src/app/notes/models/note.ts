import gql from 'graphql-tag';

export const noteFragment = gql`
  fragment noteFragment on Note {
    id
    title
    text
  }
`;

export interface NoteInput {
  title?: string;
  text?: string;
}

export interface Note extends NoteInput {
  id: string;
}
