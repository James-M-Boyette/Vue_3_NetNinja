import { ref } from "vue";

const getSinglePost = (id) => {
  const singlePost = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      let data = await fetch(`http://localhost:3000/posts/${id}`);
      if (!data.ok) {
        throw Error("That post does not exist 🔎");
      }
      singlePost.value = await data.json();
    } catch (err) {
      error.value = err.message;
      console.log(err.value);
    }
  };

  return { singlePost, error, load };
};

export default getSinglePost;
