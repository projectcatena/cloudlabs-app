import { useRouter } from 'next/router';

export default function ModulePage() {
  const router = useRouter();
  const { moduleName } = router.query;

  return <p>Module: {moduleName}</p>;
}
