import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebaseDb';

export const getUserRole = async (userEmail: string) => {
  try {
    const rolesRef = collection(db, 'roles');
    const q = query(rolesRef, where('userEmail', '==', userEmail));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return 'limited';
    }

    const roleDoc = querySnapshot.docs[0].data();

    const role = roleDoc.role || 'limited';
    if (role === 'limited') {
      if (role.includes('limited')) {
        return 'limited';
      }
    }

    return 'unlimited';
  } catch (error) {
    console.error('Erro ao buscar a role do usuário:', error);
    return 'limited';
  }
};
