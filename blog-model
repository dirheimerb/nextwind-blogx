classDiagram
direction BT
class category {
   timestamp with time zone created_at
   timestamp with time zone updated_at
   text name
   text description
   bigint post_id
}
class comments {
   timestamp with time zone created_at
   timestamp with time zone updated_at
   text content
   date published_date
   uuid author_id
   bigint post_id
}
class post {
   timestamp with time zone created_at
   timestamp with time zone updated_at
   text title
   text content
   boolean is_published
   date published_date
   uuid author_id
}
class tag {
   timestamp with time zone created_at
   text name
   bigint post_id
}

category  -->  post : post_id:id
comments  -->  post : post_id:id
tag  -->  post : post_id:id
